import pandas as pd

df = pd.read_csv("../../utils/full.csv")

agp_df = df[df["Activity"].str.contains("Anti-Gram-", na=False, case=True, regex=False)]
agp_df.to_csv("anti_gram_negative.csv", index=False)
