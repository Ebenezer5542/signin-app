from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import sqlite3
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
import os
import json

app = Flask(__name__)
CORS(app)
# Path to your downloaded service account key
SERVICE_ACCOUNT_FILE = os.environ.get("GOOGLE_SERVICE_JSON")

# Scope for Google Sheets access
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Authenticate with the service account
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=SCOPES
)

# Spreadsheet info
SPREADSHEET_ID = os.environ.get("SPREADSHEET_ID")
RANGE_NAME = 'Sheet1!A1'

def append_data(values):
    service = build('sheets', 'v4', credentials=credentials)
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




# Enable foreign‐key enforcement on every connection
def get_db():
    conn = sqlite3.connect('ipa_ghana_staff.db')
    conn.execute('PRAGMA foreign_keys = ON;')
    return conn

@app.route('/api/staff/<staff_id>', methods=['GET'])
def get_staff(staff_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        'SELECT staff_id, name, department FROM ipagh_staff WHERE staff_id = ?',
        (staff_id,)
    )
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify({'staff_id':row[0] , 'name': row[1], 'department': row[2]})
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

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO signins (staff_id, name, department, time_stamp, sign_type) VALUES (?, ?, ?, ?,?)',
        (staff_id, name, dept, timestamp,sign_type)
    )
    conn.commit()
    conn.close()


    append_data([[staff_id, name, dept, timestamp, sign_type]])

    return jsonify({'status': 'success'}), 201

if __name__ == '__main__':
    app.run(debug=True)
