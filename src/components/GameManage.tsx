import { useEffect } from "react";
import { Card, CardContent } from "../shared/card";
import { Button } from "../shared/button";
import { Separator } from "../shared/separator";
import { Input } from "../shared/input";
import { useSharedBasketballState } from "../hooks/useSharedBasketballState";
import { Link } from "react-router-dom";

export const GameManage = () => {
  const [gameState, updateGameState] = useSharedBasketballState();
  const {
    teamAName,
    teamBName,
    teamAScore,
    teamBScore,
    teamAFouls,
    teamBFouls,
    gameClock,
    shotClock,
    running,
  } = gameState;

  useEffect(() => {
    let interval: number;
    if (running && gameClock > 0) {
      interval = setInterval(() => {
        updateGameState((prev: any) => ({
          ...prev,
          gameClock: Math.max(prev.gameClock - 1, 0),
          shotClock: Math.max(prev.shotClock - 1, 0),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, gameClock, shotClock]);

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = (time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleClockInput = (value: string, key: "gameClock" | "shotClock") => {
    const [min, sec] = value.split(":".trim());
    const total = parseInt(min || "0") * 60 + parseInt(sec || "0");
    if (!isNaN(total)) updateGameState({ [key]: total });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid gap-4 p-4 max-w-6xl mx-auto">
        <Card className="p-4 text-center">
          <h1 className="text-2xl font-bold">Majur 3x3</h1>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <Input
                value={teamAName}
                onChange={(e) => updateGameState({ teamAName: e.target.value })}
                className="mb-2"
              />
              <div className="text-4xl font-bold mb-2">{teamAScore}</div>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                <Button
                  onClick={() =>
                    updateGameState({ teamAScore: Math.max(teamAScore - 1, 0) })
                  }
                >
                  -1
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamAScore: teamAScore + 1 })
                  }
                >
                  +1
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamAScore: teamAScore + 2 })
                  }
                >
                  +2
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamAScore: Math.max(teamAScore - 2, 0) })
                  }
                >
                  -2
                </Button>
              </div>
              <Separator className="my-2" />
              <div>Fouls: {teamAFouls}</div>
              <div className="flex flex-wrap gap-2 mt-1 justify-center">
                <Button
                  onClick={() =>
                    updateGameState({ teamAFouls: teamAFouls + 1 })
                  }
                >
                  + Foul
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamAFouls: Math.max(teamAFouls - 1, 0) })
                  }
                  variant="secondary"
                >
                  - Foul
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Input
                value={teamBName}
                onChange={(e) => updateGameState({ teamBName: e.target.value })}
                className="mb-2"
              />
              <div className="text-4xl font-bold mb-2">{teamBScore}</div>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                <Button
                  onClick={() =>
                    updateGameState({ teamBScore: Math.max(teamBScore - 1, 0) })
                  }
                >
                  -1
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamBScore: teamBScore + 1 })
                  }
                >
                  +1
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamBScore: teamBScore + 2 })
                  }
                >
                  +2
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamBScore: Math.max(teamBScore - 2, 0) })
                  }
                >
                  -2
                </Button>
              </div>
              <Separator className="my-2" />
              <div>Fouls: {teamBFouls}</div>
              <div className="flex flex-wrap gap-2 mt-1 justify-center">
                <Button
                  onClick={() =>
                    updateGameState({ teamBFouls: teamBFouls + 1 })
                  }
                >
                  + Foul
                </Button>
                <Button
                  onClick={() =>
                    updateGameState({ teamBFouls: Math.max(teamBFouls - 1, 0) })
                  }
                  variant="secondary"
                >
                  - Foul
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Game Clock</h2>
              <div className="text-5xl font-bold mb-2">
                {formatTime(gameClock)}
              </div>
              <Input
                type="text"
                placeholder="MM:SS"
                className="mb-2 w-32 text-center"
                onBlur={(e) => handleClockInput(e.target.value, "gameClock")}
              />
              <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => updateGameState({ running: !running })}>
                  {running ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={() => updateGameState({ gameClock: 600 })}
                  variant="secondary"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Shot Clock</h2>
              <div className="text-5xl font-bold mb-2">{shotClock}</div>
              <Input
                type="number"
                min="0"
                className="mb-2 w-24 text-center"
                onBlur={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) updateGameState({ shotClock: val });
                }}
              />
              <Button onClick={() => updateGameState({ shotClock: 12 })}>
                Reset Shot Clock
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-4 flex flex-col gap-10 items-center">
              <h2 className="text-xl font-semibold mb-2">Game Screens</h2>

              <Link to="/game-overview" target="_blank">
                <Button>Game overview</Button>
              </Link>
              <Link to="/game-shoot-clock" target="_blank">
                <Button>Shoot clock</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
