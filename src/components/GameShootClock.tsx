import { useSharedBasketballState } from "../hooks/useSharedBasketballState";

export const GameShootClock = () => {
  const [state] = useSharedBasketballState();
  const { shotClock } = state;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="text-white text-[clamp(6rem,20vw,30rem)] font-extrabold">
        {shotClock}
      </div>
    </div>
  );
};
