"""
Final modifications to master sheet.

- Add a dedicated Pep ID column
- Remove 18 peptides with unknown amino acids
- Convert "Sequence" column to uppercase
- Pep1285: Change length to 14
"""

import pandas as pd

df = pd.read_csv("../../utils/full.csv")

# Add a dedicated Pep ID column
df.insert(0, "PepID", range(len(df)))

# Remove 18 peptides with unknown amino acids
peps_to_remove = [
    4913,
    4914,
    4915,
    4916,
    4917,
    4918,
    4919,
    4922,
    5503,
    5504,
    5506,
    5507,
    5532,
    5533,
    5534,
    5535,
    5536,
    5537,
]
df = df[~df["PepID"].isin(peps_to_remove)]

# Convert "Sequence" column to uppercase
df["Sequence"] = df["Sequence"].str.upper()

# Export out
df.to_csv("final_sheet.csv", index=False)
