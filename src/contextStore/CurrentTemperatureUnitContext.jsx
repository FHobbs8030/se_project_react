import { createContext } from "react";
export const CurrentTemperatureUnitContext = createContext({
  useCelsius: false,
  setUseCelsius: () => {},
});
