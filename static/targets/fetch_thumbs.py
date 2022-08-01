from pymol import cmd
import pandas as pd

df = pd.read_csv("pdb_ids.csv")
pdb_ids = list(df['pdb_ids'])
for idx,i in enumerate(pdb_ids[23:26]):
    print (idx+83+1,i)
    cmd.fetch(i,'async=0')
    cmd.remove('inorganic')
    cmd.remove('organic')
    cmd.remove('solvent')
    cmd.spectrum()
    cmd.ray('300','300')
    cmd.png(str(idx+23)+".png")
    cmd.delete('all')