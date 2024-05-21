import pandas as pd
import os

def extract_random_column_to_txt(excel_file_path, column_name, output_directory='.'):
    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    # Read the Excel file
    xls = pd.ExcelFile(excel_file_path)
    
    # Process each sheet
    for sheet_name in xls.sheet_names:
        # Read the sheet into a DataFrame
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        
        # Check if the specified column exists in the sheet
        if column_name in df.columns:
            # Extract 30 random items from the specified column
            column_data = df[column_name].sample(n=30)
            
            # Define the output file path
            output_file_path = os.path.join(output_directory, f"{sheet_name}_{column_name}.txt")
            
            # Write the column data to the text file
            column_data.to_csv(output_file_path, index=False, header=False)
        else:
            print(f"Column '{column_name}' does not exist in sheet '{sheet_name}'")

# Example usage
excel_file_path = 'Spotify.xlsx'
column_name = 'Track ID'
output_directory = '../nitu/src/assets/random' 

extract_random_column_to_txt(excel_file_path, column_name, output_directory)
