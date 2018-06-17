Feature: Test Enpoint
 Scenario: invoke endpoint
  Given The url is '/test-endpoint'
  When Method is GET
  Then Status should be 200 and contents should be 'test'

