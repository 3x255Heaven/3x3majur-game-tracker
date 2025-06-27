import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "shared-basketball-game";

type GameState = {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  teamAFouls: number;
  teamBFouls: number;
  gameClock: number;
  shotClock: number;
  running: boolean;
};

const defaultState: GameState = {
  teamAName: "Team A",
  teamBName: "Team B",
  teamAScore: 0,
  teamBScore: 0,
  teamAFouls: 0,
  teamBFouls: 0,
  gameClock: 600,
  shotClock: 12,
  running: false,
};

export function useSharedBasketballState(): [
  GameState,
  (state: Partial<GameState>) => void
] {
  const [state, setState] = useState<GameState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  });

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("basketball_game_channel");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      setState(event.data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(event.data));
    };

    return () => {
      channel.close();
    };
  }, []);

  const updateState = (
    partialUpdate: Partial<GameState> | ((prev: GameState) => GameState)
  ) => {
    setState((prev) => {
      const newState =
        typeof partialUpdate === "function"
          ? partialUpdate(prev)
          : { ...prev, ...partialUpdate };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      channelRef.current?.postMessage(newState);
      return newState;
    });
  };

  return [state, updateState];
}
