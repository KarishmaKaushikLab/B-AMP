"""
This script was used to sort the peptides in our list of docked peptides
according to their color classes (derived from their residue interactions).
Further, intra-class sorting is performed based on the docking energy score.

This makes for better readability.
"""

import pandas as pd

COLOR_TO_PRIORITY = {
    "red": 1,
    "green": 2,
    "yellow": 3,
    "blue": 4,
    "nan": 5,
}

df = pd.read_csv("residues_by_color_code.csv")
df.sort_values(by=["colour", "Docking Score"], inplace=True, key=lambda colors: colors.replace(COLOR_TO_PRIORITY))
df.to_csv("sorted_by_color.csv", index=False)
