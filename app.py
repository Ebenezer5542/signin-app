from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import sqlite3
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
import os
import json
#import psycopg2
import pandas as pd

app = Flask(__name__)
CORS(app)
# Path to your downloaded service account key
# Load service account JSON from env
service_json = os.environ["GOOGLE_SERVICE_JSON"]
service_info = json.loads(service_json)

# Create base credentials from JSON
credentials = service_account.Credentials.from_service_account_info(service_info)

# Add scopes
scoped_credentials = credentials.with_scopes([
    "https://www.googleapis.com/auth/spreadsheets",
])

# Build Google Sheets API client with scoped credentials
sheets_service = build("sheets", "v4", credentials=scoped_credentials)

# Spreadsheet info
SPREADSHEET_ID = os.environ.get("SPREADSHEET_ID")
RANGE_NAME = 'Sheet1!A1'

def append_data(values):
    service = build('sheets', 'v4', credentials=scoped_credentials)
    sheet = service.spreadsheets()
    body = {
        'values': values
    }
    result = sheet.values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=RANGE_NAME,
        valueInputOption='RAW',
        insertDataOption='INSERT_ROWS',
        body=body
    ).execute()
    print(f"{result.get('updates').get('updatedCells')} cells appended.")





#"""# Enable foreign‐key enforcement on every connection
#def get_db():
#    db_url = os.environ.get("DATABASE_URL")
 #   return psycopg2.connect(db_url)

#def init_db():
 #   conn = get_db()
  #  cursor = conn.cursor()

   # cursor.execute("""
    #    CREATE TABLE IF NOT EXISTS ipagh_staff (
     #       staff_id INTEGER PRIMARY KEY,
      #      name TEXT,
       #     department TEXT
        #);
    #""")

  #  cursor.execute("""
   #     CREATE TABLE IF NOT EXISTS signins (
    #        id SERIAL PRIMARY KEY,
     #       staff_id INTEGER NOT NULL,
      #      name TEXT,
       #     department TEXT,
        #    time_stamp TEXT,
        #    sign_type TEXT,
         #   FOREIGN KEY (staff_id) REFERENCES ipagh_staff(staff_id)
   #     );
    #""")

    # Staff data to insert
#    dg = [
 #       (103, 'Appiah Kubi', 'OPERATIONS'),
  #      (104, 'Ama Asaah', 'RFE'),
   #     (105, 'Akwesi Boadi', 'RESEARCH QUALITY'),
   # ]

    # Insert staff records, skip if staff_id already exists
#    insert_query = """
 #       INSERT INTO ipagh_staff (staff_id, name, department)
  #      VALUES (%s, %s, %s)
   #     ON CONFLICT (staff_id) DO NOTHING;
    #"""
   # cursor.executemany(insert_query, dg)

#    conn.commit()
 #   cursor.close()
  #  conn.close()
#"""
# Static staff list (can also load from CSV)
staff_df = pd.DataFrame([
    {'staff_id': 103, 'name': 'Appiah Kubi', 'department': 'OPERATIONS'},
    {'staff_id': 104, 'name': 'Ama Asaah', 'department': 'RFE'},
    {'staff_id': 105, 'name': 'Akwesi Boadi', 'department': 'RESEARCH QUALITY'},
])





@app.route('/')
def home():
    return 'Server is running!'


@app.route('/api/ping', methods=['GET'])
def ping():
    print("Ping received — backend is awake!")
    return '', 200
    
@app.route('/routes', methods=['GET'])
def list_routes():
    import urllib
    output = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        line = urllib.parse.unquote(f"{rule.rule:30s} [{methods}]")
        output.append(line)
    return '<br>'.join(sorted(output))


@app.route('/api/staff/<staff_id>', methods=['GET'])
def get_staff(staff_id):
    try:
        sid = int(staff_id)
    except ValueError:
        return jsonify({'error': 'Invalid staff ID'}), 400

    match = staff_df[staff_df["staff_id"] == sid]
    if not match.empty:
        staff = match.iloc[0].to_dict()
        return jsonify({
            'staff_id': staff['staff_id'],
            'name': staff['name'],
            'department': staff['department']
        })
    else:
        return jsonify({'error': 'Staff not found'}), 404



@app.route('/favicon.ico')
def favicon():
    return '', 204  # No Content

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    print("Incoming data:", data)

    staff_id  = data['staff_id']
    name      = data['name']
    dept      = data['department']
    timestamp = datetime.now().isoformat()
    sign_type = data.get('sign_type')

    # Just append to Google Sheets
    append_data([[staff_id, name, dept, timestamp, sign_type]])

    return jsonify({'status': 'success'}), 201


if __name__ == '__main__':
    #init_db()  # create tables and seed data
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
