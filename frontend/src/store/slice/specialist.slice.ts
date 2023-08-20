import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Specialist } from '../../interfaces/specialist.interface';

const initialState = {} as Specialist;

const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  reducers: {
    getUser: (state, { payload }: PayloadAction<any>) => {
      return payload.specialist;
    },
  },
});

export const { getUser } = specialistSlice.actions;
export default specialistSlice.reducer;
export const specialistState = (state: RootState) => state.specialist;
