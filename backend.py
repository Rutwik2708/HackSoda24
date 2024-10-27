from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

import mysql.connector
from mysql.connector import Error

def create_db_connection():
    try:
        # Replace these values with your actual AWS RDS credentials
        connection = mysql.connector.connect(
            host="amazon.c14u84uqa4r3.us-east-1.rds.amazonaws.com",       # e.g., "your-db-instance.xxxxxxx.us-east-1.rds.amazonaws.com"
            port=3306,                      # Default MySQL port
            user="admin",           # Your MySQL username
            password="Asdfrewq",       # Your MySQL password
            database="amazon"   # The specific database you want to connect to
        )
        
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None
    
def close_db_connection(connection):
    if connection.is_connected():
        connection.close()

def create_cursor(connection):
    try:
        return connection.cursor()
    except Error as e:
        print(f"Error: {e}")
        return None

def close_cursor(cursor):
    cursor.close()


def execute_query(cursor, query):
    try:
        cursor.execute(query)
        return cursor
    except Error as e:
        print(f"Error: {e}")
        return False

# Endpoint to get all products
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = create_db_connection()
    cursor = create_cursor(conn)
    cursor.execute("SELECT * FROM Product")
    rows = cursor.fetchall()
    columns = [description[0] for description in cursor.description]
    close_cursor(cursor)
    close_db_connection(conn)
    
    results = []
    for row in rows:
        results.append(dict(zip(columns, row)))
    
    return jsonify(results)

@app.route('/api/product-details', methods=['POST'])
def get_product_details():
    data = request.json
    product_id = data.get('product_id')
    user_id = data.get('user_id')

    if not product_id or not user_id:
        return jsonify({"error": "product_id and user_id are required"}), 400

    conn = create_db_connection()
    cursor = create_cursor(conn)
    cursor.execute(f"SELECT * FROM Product WHERE product_id = {product_id}")
    row = cursor.fetchone()
    columns = [description[0] for description in cursor.description]
    close_cursor(cursor)
    close_db_connection(conn)

    if row:
        product_details = dict(zip(columns, row))
        # restocking_fee = calculate_restocking_fee(product_details['product_price'])
        restocking_fee = "20$"
        product_details['restocking_fee'] = restocking_fee
        return jsonify(product_details)
    
    return jsonify({"error": "Product not found"}), 404

# Endpoint to get a specific product by Product_Id
@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product = next((item for item in products if item["Product_Id"] == product_id), None)
    if product:
        # Additional details for the product page
        product_detail = {
            **product,
            "Restocking_fees": 20,
            "Product_Category": "Electronics",
            "Product_Reviews": ["Good quality", "Worth the price"],
            "Product_Rating": 4.5
        }
        return jsonify(product_detail)
    return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':

    app.run(debug=True)
   
