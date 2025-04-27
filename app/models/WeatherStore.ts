import { Instance, SnapshotOut, types } from "mobx-state-tree"

const generateRandomId = (): number => {
  return Math.floor(Math.random() * 1000000);
}

const CityModel = types.model("City", {
  id: types.number,
  city: types.string,
})

export const WeatherStoreModel = types
    .model("WeatherStore")
    .props({
      history: types.array(CityModel)
    })
    .views((store) => ({
      // Check if a city exists in history
      hasCity(cityName: string): boolean {
        return store.history.some(item => item.city.toLowerCase() === cityName.toLowerCase());
      }
    }))
    .actions((store) => ({
      // Add a city to the history
      addCity(cityName: string) {
        if (store.hasCity(cityName)) return
        const newCity = {
          id: generateRandomId(),
          city: cityName,
        };
        store.history.push(newCity);
        return newCity;
      },

      // Clear all cities from history
      clearHistory() {
        store.history.clear();
      }
    }))

export interface WeatherStore extends Instance<typeof WeatherStoreModel> { }
export interface WeatherStoreSnapshot extends SnapshotOut<typeof WeatherStoreModel> { }