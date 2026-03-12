import csv
import json
import os

def convert_csv_to_js(csv_filepath, js_filepath):
    """
    Reads a CSV file containing math questions and writes it to a JS file
    as a variable named 'questionsData'.
    """
    questions = []
    
    try:
        with open(csv_filepath, mode='r', encoding='utf-8-sig') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Ensure correct types for numeric IDs
                question_obj = {
                    "Set_ID": int(row.get("Set_ID", 0)),
                    "Category": row.get("Category", "").strip(),
                    "Question_No": int(row.get("Question_No", 0)),
                    "Question": row.get("Question", "").strip(),
                    "Answer": row.get("Answer", "").strip()
                }
                questions.append(question_obj)
                
        # Write to JS file
        js_content = f"const questionsData = {json.dumps(questions, indent=2)};\n"
        
        with open(js_filepath, mode='w', encoding='utf-8') as jsfile:
            jsfile.write(js_content)
            
        print(f"Successfully converted {len(questions)} questions from {csv_filepath} to {js_filepath}")
        
    except Exception as e:
        print(f"Error converting file: {e}")

if __name__ == '__main__':
    csv_file = 'math_questions_final.csv'
    js_file = 'data.js'
    
    # Use absolute paths if running from a different directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, csv_file)
    js_path = os.path.join(base_dir, js_file)
    
    convert_csv_to_js(csv_path, js_path)
