import pandas as pd
import os

def extract_random_column_to_txt(excel_file_path, column_name, output_directory='.'):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    xls = pd.ExcelFile(excel_file_path)
    
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        
        if column_name in df.columns:
            column_data = df[column_name].sample(n=30)
            
            output_file_path = os.path.join(output_directory, f"{sheet_name}_{column_name}.txt")
            
            column_data.to_csv(output_file_path, index=False, header=False)
        else:
            print(f"Column '{column_name}' does not exist in sheet '{sheet_name}'")

excel_file_path = 'Spotify.xlsx'
column_name = 'Track ID'
output_directory = '../nitu/src/assets/random' 

extract_random_column_to_txt(excel_file_path, column_name, output_directory)
