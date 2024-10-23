import os

from behave import given, step, then, when
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# access matches page

@given(u'a club supporter is on the landing page,')
def given_a_club_supporter(context):
    context.driver = webdriver.Chrome()
    context.driver.get("http://localhost:8080/")

@when("they select the “Jogos“ option,")
def they_select_the_jogos_option(context):
    jogos_button = context.driver.find_element(By.XPATH, "//button[contains(.,'Jogos')]")
    jogos_button.click()

@then("they should see a list of the relevant matches.")
def they_should_be_redirected_to_the_jogos_page(context):
    current_url = context.driver.current_url
    expected_url = "http://localhost:8080/matches"
    assert expected_url is not None
    assert current_url == expected_url

#filter by team name

@given(u'a club supporter is on the matches page,')
def given_a_club_supporter_is_on_the_matches_page(context):
    context.driver = webdriver.Chrome()
    context.driver.get("http://localhost:8080/matches")



@when(u'they search for "braga",')
def they_search_for_team_name(context):
    wait = WebDriverWait(context.driver, 1)  # Esperar até 10 segundos
    team_name = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".file\\3A border-0")))
    team_name.clear()
    team_name.send_keys("braga")

@then(u'they should see the matches that are scheduled for "HC Braga".')
def they_should_see_the_matches_for_team_name(context):
    matches = context.driver.find_elements(By.XPATH, "//*[@id='root']/div[2]/div/div[4]/div[2]/div/div[2]/div[1]/div[1]/span")
    assert matches is not None
    for match in matches:
        assert "HC Braga" in match.text

# filter by date

@when(u'they select a "26/11/2024",')
def they_select_a_date(context):
    wait = WebDriverWait(context.driver, 1)

    date_input = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".w-\\[280px\\]")))
    date_input.click()

    specific_date_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'26')]")))
    specific_date_button.click()

@then(u'they should see the match between "HC Braga" and "GRF Murches".')
def step_impl(context):
    matches = context.driver.find_elements(By.XPATH, "//*[@id='root']/div[2]/div/div[4]/div[2]/div/div[2]/div[1]/div[1]/span")
    assert matches is not None
    for match in matches:
        assert "HC Braga" in match.text

# filter by matchday
@when(u'they select "1ª Jornada",')
def they_select_a_matchday(context):
    wait = WebDriverWait(context.driver, 10)  # Espera até 10 segundos

    # Primeiro, clica no botão
    button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div[2]/div/div[3]/div[2]/button')))
    button.click()

    # Depois, seleciona o elemento <span>
    matchday_span = wait.until(
        EC.presence_of_element_located((By.XPATH, "/html/body/div/div[2]/div/div[3]/div[2]/button/span")))

    # Verifica se o conteúdo do <span> é "1ª Jornada"
    assert "1ª Jornada" in matchday_span.text, f"Expected text '1ª Jornada', but got '{matchday_span.text}'"

    # Clica no <span> (se necessário, pode ser redirecionado ao clique no botão pai novamente)
    matchday_span.click()



@then(u'they should see the match between "Candelária SC" and "GRF Murches".')
def they_should_see_the_match_between_candelaria_sc_and_grf_murches(context):
    raise NotImplementedError(u'STEP: Then they should see the match between "Candelária SC" and "GRF Murches".')






