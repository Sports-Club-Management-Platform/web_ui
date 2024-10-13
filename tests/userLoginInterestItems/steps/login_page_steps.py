import os
import time

from behave import given, step, then, when
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

load_dotenv()
LOGIN_SIGN_UP_URI = os.environ.get("VITE_LOGIN_SIGN_UP")

@given("a registered user,")
def given_a_registered_user(context):
    context.driver = webdriver.Chrome()

@when("they visit the login page")
def they_visit_the_login_page(context):
    context.driver.get(LOGIN_SIGN_UP_URI)

@step("enter valid credentials,")
def enter_valid_credentials(context):
    username_input = context.driver.find_element(By.ID, "signInFormUsername")
    password_input = context.driver.find_element(By.ID, "signInFormPassword")
    username_input.send_keys("usertest")
    password_input.send_keys("Qawsed-12")
    assert username_input is not None
    assert password_input is not None

@step("select “Continue with google” button")
def select_continue_with_google_button(context):
    continue_with_google_button = context.driver.find_element(By.NAME, "googleSignUpButton")
    continue_with_google_button.click()

@step("select their google account,")
def select_their_google_account(context):
    wait = WebDriverWait(context.driver, 10)
    
    google_account = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@data-item-index='0']")))
    google_account.click()
    
@then("they should be able to log in successfully, access their account and the intended features.")
def they_should_be_able_to_log_in_successfully_access_their_account_and_the_intended_features(context):
    wait = WebDriverWait(context.driver, 10)
    wait.until(EC.url_to_be("http://localhost:5173/"))

    login_button = context.driver.find_element(By.XPATH, "//button[text()='Login']")
    assert login_button is None