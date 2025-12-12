@saucedemo
Feature: Compra de productos en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión, agregar productos al carrito y completar una compra
  Para poder adquirir los productos que necesito

  Background:
    Given que estoy en la página de login de Sauce Demo

  @criterio-1-2 @login @regression
  Scenario Outline: Login con diferentes tipos de usuario
    Given que estoy en la página de login de Sauce Demo
    When inicio sesión como "<usuario>" con la contraseña "<password>"
    Then debería ver el resultado de login "<resultado>"

    Examples:
      | usuario         | password      | resultado   |
      | standard_user   | secret_sauce  | exito       |
      | standard_user   | clave_mala    | error       |
      | locked_out_user | secret_sauce  | bloqueado   |

  @criterio-3 @cart @happy_path @regression
  Scenario: El usuario puede agregar un producto al carrito desde la página de productos
    When inicio sesión como "standard_user" con la contraseña "secret_sauce"
    And agrego el primer producto al carrito
    Then el icono del carrito debería mostrar "1"

  @criterio-4 @cart @happy_path @regression
  Scenario: El usuario puede ver los productos agregados en el carrito de compras
    When inicio sesión como "standard_user" con la contraseña "secret_sauce"
    And agrego el primer producto al carrito
    And voy al carrito
    Then debería ver los productos agregados en el carrito de compras

  @criterio-5 @checkout @happy_path @smoke @regression
  Scenario: El usuario puede completar el proceso de compra hasta la confirmación
    When inicio sesión como "standard_user" con la contraseña "secret_sauce"
    And agrego el primer producto al carrito
    And voy al carrito
    And comienzo el checkout
    And completo el formulario de checkout con "Juan" "Pérez" "15000"
    And finalizo la compra
    Then debería ver la confirmación de la orden
