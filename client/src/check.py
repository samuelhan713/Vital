import numpy as np
from Bio_Epidemiology_NER.bio_recognizer import ner_prediction
doc = """
	CASE: A 28-year-old previously healthy man presented with a 6-week history of palpitations. 
      The symptoms occurred during rest, 2–3 times per week, lasted up to 30 minutes at a time 
      and were associated with dyspnea. Except for a grade 2/6 holosystolic tricuspid regurgitation 
      murmur (best heard at the left sternal border with inspiratory accentuation), physical 
      examination yielded unremarkable findings.
      """

df = ner_prediction(corpus=doc, compute='cpu')
print(df.shape)

# import sys
# print("Hello world")