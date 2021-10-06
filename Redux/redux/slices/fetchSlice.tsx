import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../Shared_Components/store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../pages/axiosInterceptor";

export const fetchMap = createAsyncThunk(
  "fetchData/Map",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor().get("map");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchAnnualrainData = createAsyncThunk(
  "fetchData/AnnualRainData",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInterceptor().get("annualrain");
      return response.data.annualRain;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSlumsData = createAsyncThunk(
  "fetchData/SlumsData",
  async (_, { rejectWithValue }) => {
    try {
      const response :any = await axiosInterceptor().get("slums");
      return response.data.slums;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchPopulationData = createAsyncThunk(
  "fetchData/PopulationData",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInterceptor().get("population");
      return response.data.population;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchMonthData = createAsyncThunk(
  "fetchData/MonthsData",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInterceptor().get("months");
      return response.data.monthlyTotal;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

interface states {
  data: [];
  state: string;
}

const initialResponce: states = {
  data: [],
  state: "empty",
};

interface fetchState {
  refresh: boolean;
  mapJSON: states;
  annualrain: states;
  slums: states;
  population: states;
  months: states;
  error: string;
  errorState: boolean;
}

const initialState: fetchState = {
  refresh: false,
  errorState: false,
  error: "",
  mapJSON: { ...initialResponce },
  annualrain: { ...initialResponce },
  slums: { ...initialResponce },
  population: { ...initialResponce },
  months: { ...initialResponce },
};

const FetchSlice = createSlice({
  name: "dataFetchSlice",
  initialState,
  reducers: {
    readDataAgain: (state) => {
      state.refresh = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualrainData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          annualrain: {
            ...state.annualrain,
            state: "pending",
          },
          errorState: false,
        };
      })
      .addCase(fetchAnnualrainData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          annualrain: {
            ...state.annualrain,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchAnnualrainData.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          annualrain: {
            ...state.annualrain,
            state: "rejected",
          },
          error: action.payload,
          errorState: true,
        };
      })

      .addCase(fetchSlumsData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          slums: {
            ...state.slums,
            state: "pending",
          },
          errorState: false,
        };
      })
      .addCase(fetchSlumsData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          slums: {
            ...state.slums,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchSlumsData.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          slums: {
            ...state.slums,
            state: "rejected",
          },
          error: action.payload,
          errorState: true,
        };
      })

      .addCase(fetchPopulationData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          population: {
            ...state.population,
            state: "pending",
            error: action.payload,
          },
          errorState: false,
        };
      })
      .addCase(fetchPopulationData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          population: {
            ...state.population,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchPopulationData.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          population: {
            ...state.population,
            state: "rejected",
          },
          error: action.payload,
          errorState: true,
        };
      })

      .addCase(fetchMonthData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            state: "pending",
          },
          errorState: false,
        };
      })
      .addCase(fetchMonthData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchMonthData.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            state: "rejected",
          },
          error: action.payload,
          errorState: true,
        };
      })
      .addCase(fetchMap.pending, (state: RootState) => {
        return {
          ...state,
          refresh: false,
          mapJSON: {
            ...state.months,
            state: "pending",
          },
          errorState: false,
        };
      })
      .addCase(fetchMap.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          mapJSON: {
            ...state.months,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchMap.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          mapJSON: {
            ...state.months,
            state: "rejected",
          },
          error: action.payload,
          errorState: true,
        };
      });
  },
});

export const { readDataAgain } = FetchSlice.actions;

export default FetchSlice.reducer;
