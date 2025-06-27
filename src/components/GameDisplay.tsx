import { useSharedBasketballState } from "../hooks/useSharedBasketballState";
import { Logo } from "../assets/Logo";

export const GameDisplay = () => {
  const [state] = useSharedBasketballState();
  const {
    teamAName,
    teamBName,
    teamAScore,
    teamBScore,
    teamAFouls,
    teamBFouls,
    gameClock,
  } = state;

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = (time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center bg-gradient-to-b from-black to-[#cb4139] text-white p-4">
      <div className="flex items-center justify-evenly gap-4 mb-6 text-center w-full">
        <div className="flex-1">
          <div className="font-extrabold uppercase text-[clamp(2.5rem,4vw,4.5rem)] text-center px-4 leading-tight min-h-[5.5rem] flex items-center justify-center">
            {teamAName}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[clamp(4rem,10vw,12rem)] font-normal bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-2 shadow-lg">
            {formatTime(gameClock)}
          </span>
        </div>
        <div className="flex-1">
          <div className="font-extrabold uppercase text-[clamp(2.5rem,4vw,4.5rem)] text-center px-4 leading-tight min-h-[5.5rem] flex items-center justify-center">
            {teamBName}
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-center gap-4 text-center w-full">
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-full min-w-[260px] max-w-[300px] aspect-square bg-black border-4 border-white rounded-3xl flex items-center justify-center shadow-lg">
            <span className="font-extrabold text-[clamp(5rem,12vw,14rem)] leading-none">
              {teamAScore}
            </span>
          </div>
          <div className="font-semibold uppercase text-[clamp(1.5rem,2.5vw,2.5rem)]">
            Fouls
          </div>
          <div className="w-full max-w-[180px] aspect-square bg-black border-4 border-white rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-[clamp(3rem,7vw,8rem)] font-extrabold">
              {teamAFouls}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <Logo color="#FFFFFF" width="60rem" height="30rem" />
        </div>

        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-full min-w-[260px] max-w-[300px] aspect-square bg-black border-4 border-white rounded-3xl flex items-center justify-center shadow-lg">
            <span className="font-extrabold text-[clamp(5rem,12vw,14rem)] leading-none">
              {teamBScore}
            </span>
          </div>
          <div className="font-semibold uppercase text-[clamp(1.5rem,2.5vw,2.5rem)]">
            Fouls
          </div>
          <div className="w-full max-w-[180px] aspect-square bg-black border-4 border-white rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-[clamp(3rem,7vw,8rem)] font-extrabold">
              {teamBFouls}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
