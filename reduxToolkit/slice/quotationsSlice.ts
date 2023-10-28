import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quotation {
	firstName:string;
	lastName:string;
	mobileNumber:number;
	email:string;
	workType:string;
	rate:number;
	length:number;
	width:number;
	height:number;
	totalArea:number;
	amount:number;
	discount:number;
}

interface QuotationsState {
  quotations: Quotation[];
}

const initialState: QuotationsState = {
  quotations: [],
};

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
	addQuotation: (state, action: PayloadAction<Quotation>) => {
	  state.quotations.push(action.payload);
	},
	updateQuotation: (state, action: PayloadAction<Quotation>) => {
		const {activeIndex, partyData} = action.payload;
		state.quotations[activeIndex] = partyData;
	},
	deleteQuotation: (state, action: PayloadAction<number>) => {
	  state.quotations = state.quotations.filter((q) => q.id !== action.payload);
	},
  },
});

export const { addQuotation, updateQuotation, deleteQuotation } = quotationsSlice.actions;

export default quotationsSlice.reducer;
