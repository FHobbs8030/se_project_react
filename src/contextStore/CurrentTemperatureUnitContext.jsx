import { createContext, useContext } from "react";

export const CurrentTemperatureUnitContext = createContext({ unit: "F", setUnit: () => {} });
export const useTempUnit = () => useContext(CurrentTemperatureUnitContext);
