"""
Final modifications to master sheet.

- Add a dedicated Pep ID column
- Remove 18 peptides with unknown amino acids
- Convert "Sequence" column to uppercase
- Pep1285: Change length to 14
"""

import pandas as pd

full_df = pd.read_csv("../../utils/full.csv")

# Add a dedicated Pep ID column
full_df.insert(0, "PepID", range(len(full_df)))


# Export out
full_df.to_csv("final_sheet.csv", index=False)