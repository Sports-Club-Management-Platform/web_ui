Feature: Matches List Items

    Scenario: Open Matches Page
      Given a club supporter is on the landing page,
      When they select the “Jogos“ option,
      Then they should see a list of the relevant matches.

    Scenario: Filter Matches by Name
      Given a club supporter is on the matches page,
      When they search for "braga",
      Then they should see the matches that are scheduled for "HC Braga".

    Scenario: Filter Matches by Date
      Given a club supporter is on the matches page,
      When they select a "26/11/2024",
      Then they should see the match between "HC Braga" and "GRF Murches".

