"""
Stutee needed the "Source" column from our master CSV
to be included in the CSV for our docked peptides.

This scripts loads in both CSVs and then merges based on their DRAMP IDs.
"""

import pandas as pd

full_df = pd.read_csv("../../utils/full.csv")
full_df = full_df[["DRAMP_ID", "Source"]]

docked_df = pd.read_csv("sorted_by_color.csv")

docked_df = pd.merge(docked_df, full_df, on=["DRAMP_ID"], how="inner")
docked_df.to_csv("docked_with_sources.csv", index=False)
