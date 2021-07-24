"""
This script was used to sort the peptides in our list of docked peptides
according to their color classes (derived from their residue interactions).
Further, intra-class sorting is performed based on the docking energy score.

This makes for better readability.
"""

import pandas as pd

COLORS = ["red", "green", "yellow", "blue", "pink", "purple", "orange", "black", "olive", "grey", "mustard", "lemon", "nan"]
COLOR_TO_PRIORITY = {}

for index, color in enumerate(COLORS):
    COLOR_TO_PRIORITY[color] = index + 1

df = pd.read_csv("residues_by_color_code.csv")
df.sort_values(by=["colour", "Docking Score"], inplace=True, key=lambda colors: colors.replace(COLOR_TO_PRIORITY))
df.to_csv("sorted_by_color.csv", index=False)
