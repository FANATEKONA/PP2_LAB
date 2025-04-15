import psycopg2
import csv

DB_NAME = "Example 1"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"
DB_PORT = "5432"

def connect_db():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cur = conn.cursor()
    return conn, cur

def create_phonebook_table():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        print("Таблица phonebook уже существует.")
    else:
        cur.execute("""
            CREATE TABLE phonebook (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                phone VARCHAR(50) NOT NULL
            );
        """)
        conn.commit()
        print("Таблица phonebook создана.")
    cur.close()
    conn.close()


def insert_data_from_console():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        username = input("Введите имя пользователя: ")
        phone = input("Введите номер телефона: ")
        cur.execute("INSERT INTO phonebook (username, phone) VALUES (%s, %s)", (username, phone))
        conn.commit()
        cur.close()
        conn.close()
        print("Данные добавлены.")
        
    else:
        print("Создайте таблицу phonebook.")

def insert_data_from_csv(csv_file):
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        try:
            with open(csv_file, "r", encoding="utf-8") as f:
                reader = csv.reader(f)
                for row in reader:
                    if len(row) < 2:
                        continue
                    username, phone = row[0], row[1]
                    cur.execute("INSERT INTO phonebook (username, phone) VALUES (%s, %s)", (username, phone))
            conn.commit()
            print("Данные из CSV добавлены.")
        except FileNotFoundError:
            print("Файл не найден.")
        cur.close()
        conn.close()
    else:
        print("Создайте таблицу phonebook.")



def update_phonebook():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        mode = input("Что хотите изменить? (1) Имя, (2) Телефон: ")
        if mode == "1":
            old_name = input("Текущее имя: ")
            new_name = input("Новое имя: ")
            cur.execute("UPDATE phonebook SET username=%s WHERE username=%s", (new_name, old_name))
            if cur.rowcount > 0:
                print("Имя обновлено.")
            else:
                print("Имя не найдено.")
        elif mode == "2":
            user_name = input("Имя пользователя: ")
            new_phone = input("Новый телефон: ")
            cur.execute("UPDATE phonebook SET phone=%s WHERE username=%s", (new_phone, user_name))
            if cur.rowcount > 0:
                print("Телефон обновлен.")
            else:
                print("Пользователь не найден.")
        else:
            print("Некорректный выбор.")
        conn.commit()
        cur.close()
        conn.close()
    else:
        print("Создайте таблицу phonebook.")

def query_phonebook():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        mode = input("Фильтр? (1) Нет, (2) По имени, (3) По телефону: ")
        if mode == "1":
            cur.execute("SELECT id, username, phone FROM phonebook ORDER BY id;")
        elif mode == "2":
            pattern = input("Часть имени: ")
            cur.execute("SELECT id, username, phone FROM phonebook WHERE username ILIKE %s ORDER BY id;", (f"%{pattern}%",))
        elif mode == "3":
            pattern = input("Часть телефона: ")
            cur.execute("SELECT id, username, phone FROM phonebook WHERE phone ILIKE %s ORDER BY id;", (f"%{pattern}%",))
        else:
            print("Некорректный выбор. Покажем все записи.")
            cur.execute("SELECT id, username, phone FROM phonebook ORDER BY id;")
        rows = cur.fetchall()
        if rows:
            for row in rows:
                print(row)
        else:
            print("Нет записей.")
        cur.close()
        conn.close()
    else:
        print("Создайте таблицу phonebook.")
        
def delete_data():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if exists:
        mode = input("Удалить по (1) имени или (2) телефону? ")
        if mode == "1":
            name = input("Введите имя: ")
            cur.execute("DELETE FROM phonebook WHERE username=%s", (name,))
        elif mode == "2":
            phone = input("Введите телефон: ")
            cur.execute("DELETE FROM phonebook WHERE phone=%s", (phone,))
        else:
            print("Некорректный выбор.")
            cur.close()
            conn.close()
            return
        if cur.rowcount > 0:
            print("Запись(и) удалены.")
        else:
            print("Ничего не удалено.")
        conn.commit()
        cur.close()
        conn.close()
    else:
        print("Создайте таблицу phonebook.")



def delete_table():
    conn, cur = connect_db()
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'phonebook'
        );
    """)
    exists = cur.fetchone()[0]
    if not exists:
        print("Таблица phonebook не существует.")
        cur.close()
        conn.close()
        return
    mode = input("Вы точно хотите удалить таблицу? Да(1) / Нет(2): ")
    if mode == "1":
        cur.execute("DROP TABLE phonebook;")
        conn.commit()
        print("Таблица phonebook успешно удалена.")
    else:
        print("Удаление отменено.")
    cur.close()
    conn.close()





def main_menu():
    while True:
        print("\n--- PHONEBOOK MENU ---")
        print("1. Создать таблицу")
        print("2. Добавить запись (консоль)")
        print("3. Добавить записи из CSV")
        print("4. Обновить запись (имя или телефон)")
        print("5. Показать записи")
        print("6. Удалить запись")
        print("7. Удалить таблицу")
        print("0. Выход")
        choice = input("Выберите действие: ")
        if choice == "1":
            create_phonebook_table()
        elif choice == "2":
            insert_data_from_console()
        elif choice == "3":
            csv_file = input("Имя CSV-файла: ")
            insert_data_from_csv(csv_file)
        elif choice == "4":
            update_phonebook()
        elif choice == "5":
            query_phonebook()
        elif choice == "6":
            delete_data()
        elif choice == "0":
            print("Выход.")
            break
        elif choice == "7":
            delete_table()
        else:
            print("Некорректный выбор.")

if __name__ == "__main__":
    main_menu()
