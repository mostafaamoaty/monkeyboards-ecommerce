import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, ZoomIn, ZoomOut, Trash2, RotateCw, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pedals, categories, type Pedal } from "@/lib/pedals";
import {
  usePedalboardStore,
  boardSizes,
  type BoardPedal,
} from "@/lib/pedalboardStore";

const SCALE_FACTOR = 0.7;

function PedalSidebarItem({ pedal, zoom }: { pedal: Pedal; zoom: number }) {
  const addPedal = usePedalboardStore((state) => state.addPedal);
  const boardSize = usePedalboardStore((state) => state.boardSize);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number } }
  ) => {
    const canvas = document.getElementById("pedalboard-canvas");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const screenX = info.point.x - rect.left;
    const screenY = info.point.y - rect.top;

    if (screenX >= 0 && screenX <= rect.width && screenY >= 0 && screenY <= rect.height) {
      const boardX = screenX / zoom;
      const boardY = screenY / zoom;
      
      const pedalWidth = pedal.width * SCALE_FACTOR;
      const pedalHeight = pedal.height * SCALE_FACTOR;
      const clampedX = Math.max(0, Math.min(boardX - pedalWidth / 2, boardSize.width - pedalWidth));
      const clampedY = Math.max(0, Math.min(boardY - pedalHeight / 2, boardSize.height - pedalHeight));
      addPedal(pedal, clampedX, clampedY);
    }
  };

  return (
    <motion.div
      drag
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, zIndex: 100 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="p-2 hover-elevate" data-testid={`pedal-sidebar-${pedal.id}`}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: pedal.color }}
          >
            <img
              src={pedal.imageUrl}
              alt={`${pedal.brand} ${pedal.model}`}
              className="w-full h-full object-contain"
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{pedal.model}</p>
            <p className="text-xs text-muted-foreground truncate">{pedal.brand}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CanvasPedal({ boardPedal, zoom }: { boardPedal: BoardPedal; zoom: number }) {
  const { selectedPedalId, selectPedal, updatePedalPosition, rotatePedal, boardSize } =
    usePedalboardStore();
  const isSelected = selectedPedalId === boardPedal.instanceId;

  const pedalWidth = boardPedal.pedal.width * SCALE_FACTOR;
  const pedalHeight = boardPedal.pedal.height * SCALE_FACTOR;

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { delta: { x: number; y: number } }
  ) => {
    const deltaX = info.delta.x / zoom;
    const deltaY = info.delta.y / zoom;
    const newX = Math.max(0, Math.min(boardPedal.x + deltaX, boardSize.width - pedalWidth));
    const newY = Math.max(0, Math.min(boardPedal.y + deltaY, boardSize.height - pedalHeight));
    updatePedalPosition(boardPedal.instanceId, newX, newY);
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    rotatePedal(boardPedal.instanceId, (boardPedal.rotation + 90) % 360);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={handleDrag}
      onClick={(e) => {
        e.stopPropagation();
        selectPedal(boardPedal.instanceId);
      }}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      className={`absolute cursor-grab active:cursor-grabbing ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      style={{
        width: pedalWidth,
        height: pedalHeight,
        left: boardPedal.x,
        top: boardPedal.y,
        transform: `rotate(${boardPedal.rotation}deg)`,
      }}
      data-testid={`canvas-pedal-${boardPedal.instanceId}`}
    >
      <div
        className="relative w-full h-full rounded-md flex items-center justify-center overflow-hidden shadow-md border border-black/20"
        style={{ backgroundColor: boardPedal.pedal.color }}
      >
        <img
          src={boardPedal.pedal.imageUrl}
          alt={`${boardPedal.pedal.brand} ${boardPedal.pedal.model}`}
          className="w-full h-full object-contain rounded-sm"
          draggable={false}
        />
        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] font-medium text-center py-0.5 truncate pointer-events-none">
          {boardPedal.pedal.model}
        </span>
        {isSelected && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleRotate}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md"
                data-testid={`rotate-pedal-${boardPedal.instanceId}`}
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Rotate 90 degrees</TooltipContent>
          </Tooltip>
        )}
      </div>
    </motion.div>
  );
}

export default function PedalboardPlanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const {
    boardPedals,
    selectedPedalId,
    boardSize,
    zoom,
    selectPedal,
    clearBoard,
    setBoardSize,
    setZoom,
    deleteSelected,
  } = usePedalboardStore();

  const filteredPedals = pedals.filter((pedal) => {
    const matchesSearch =
      pedal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pedal.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || pedal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCanvasClick = useCallback(() => {
    selectPedal(null);
  }, [selectPedal]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedPedalId) {
        e.preventDefault();
        deleteSelected();
      }
    },
    [selectedPedalId, deleteSelected]
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden" onKeyDown={handleKeyDown} tabIndex={0}>
      <aside className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border space-y-3">
          <h2 className="font-semibold text-lg">Pedal Library</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pedals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-pedals"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {filteredPedals.map((pedal) => (
              <PedalSidebarItem key={pedal.id} pedal={pedal} zoom={zoom} />
            ))}
            {filteredPedals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No pedals found
              </p>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Drag pedals onto the board to add them
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-muted/30">
        <div className="h-14 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5 text-muted-foreground" />
            <Select
              value={boardSize.id}
              onValueChange={(value) => {
                const size = boardSizes.find((s) => s.id === value);
                if (size) setBoardSize(size);
              }}
            >
              <SelectTrigger className="w-36" data-testid="select-board-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {boardSizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="text-xs">
              {boardSize.width} x {boardSize.height}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom(zoom - 0.1)}
                disabled={zoom <= 0.5}
                data-testid="button-zoom-out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm w-12 text-center font-medium">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom(zoom + 0.1)}
                disabled={zoom >= 2}
                data-testid="button-zoom-in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={deleteSelected}
              disabled={!selectedPedalId}
              data-testid="button-delete-selected"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={clearBoard}
              disabled={boardPedals.length === 0}
              data-testid="button-clear-board"
            >
              Clear Board
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <div
            id="pedalboard-canvas"
            onClick={handleCanvasClick}
            className="relative rounded-lg shadow-lg"
            style={{
              width: boardSize.width * zoom,
              height: boardSize.height * zoom,
              background: `
                linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.02) 10px,
                  rgba(255,255,255,0.02) 11px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.02) 10px,
                  rgba(255,255,255,0.02) 11px
                )
              `,
              border: "3px solid #333",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)",
            }}
            data-testid="pedalboard-canvas"
          >
            <div
              className="absolute inset-0 origin-top-left"
              style={{
                transform: `scale(${zoom})`,
                width: boardSize.width,
                height: boardSize.height,
              }}
            >
              {boardPedals.map((boardPedal) => (
                <CanvasPedal key={boardPedal.instanceId} boardPedal={boardPedal} zoom={zoom} />
              ))}
            </div>

            {boardPedals.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white/40 text-lg">
                  Drag pedals here to build your pedalboard
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="h-10 border-t border-border bg-background flex items-center justify-between px-4">
          <span className="text-xs text-muted-foreground">
            {boardPedals.length} pedal{boardPedals.length !== 1 ? "s" : ""} on board
          </span>
          <span className="text-xs text-muted-foreground">
            Press Delete or Backspace to remove selected pedal
          </span>
        </div>
      </div>
    </div>
  );
}
