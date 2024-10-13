import os

from behave import given, step, then, when
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

load_dotenv()
LOGIN_SIGN_UP_URI = os.environ.get("VITE_LOGIN_SIGN_UP")

@given("a new user,")
def given_a_new_user(context):
    context.driver = webdriver.Chrome()

@when("they visit the login page")
def they_visit_the_login_page(context):
    context.driver.get(LOGIN_SIGN_UP_URI)

@step("select the “Sign Up“ button")
def select_the_sign_up_button(context):
    sign_up_link = context.driver.find_element(By.LINK_TEXT, "Sign up")
    sign_up_link.click()

@step("provide valid information,")
def provide_valid_information(context):
    wait = WebDriverWait(context.driver, 10)

    username_input = wait.until(EC.presence_of_element_located((By.NAME, "username")))
    first_name_input = context.driver.find_element(By.NAME, "requiredAttributes[given_name]")
    last_name_input = context.driver.find_element(By.NAME, "requiredAttributes[family_name]")
    email_input = context.driver.find_element(By.NAME, "requiredAttributes[email]")
    password_input = context.driver.find_element(By.NAME, "password")

    username_input.send_keys("usertest")
    first_name_input.send_keys("User")
    last_name_input.send_keys("Test")
    email_input.send_keys("teste@gmail.com")
    password_input.send_keys("Teste-122")

    assert username_input is not None
    assert first_name_input is not None
    assert last_name_input is not None
    assert email_input is not None
    assert password_input is not None

    sign_up_button = context.driver.find_element(By.XPATH, "//button[text()='Sign up']")
    sign_up_button.click()

@then("they should be able to create an account.")
def they_should_be_able_to_create_an_account(context):
    wait = WebDriverWait(context.driver, 10)
    confirm_account_header = wait.until(EC.presence_of_element_located((By.XPATH, "//h3[text()='Confirm your account']")))

    assert confirm_account_header is not None
    

