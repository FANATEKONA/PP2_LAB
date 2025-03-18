import pygame, sys, random, time
from pygame.locals import *

pygame.init()

# Create fonts for Game Over text and small info text
font = pygame.font.SysFont("Verdana", 60)
font_small = pygame.font.SysFont("Verdana", 20)
game_over = font.render("Game Over", True, (0, 0, 0))

# Load background image
background = pygame.image.load("AnimatedStreet.png")

# Screen dimensions and initial game parameters
scr_width = 400
scr_height = 600
speed = 5
score = 0
coinscore = 0

# Create game window and clock
disp = pygame.display.set_mode((scr_width, scr_height))
pygame.display.set_caption("Snake Game with Levels")
FPS = pygame.time.Clock()
disp.fill((255, 255, 255))

class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("Enemy.png")
        self.rect = self.image.get_rect()
        # Set enemy starting position at a random x-coordinate at the top
        self.rect.center = (random.randint(40, scr_width - 40), 0)
    
    def move(self):
        global score
        # Move enemy downwards by the current speed
        self.rect.move_ip(0, speed)
        # If enemy moves off the bottom of the screen, increase score and reset enemy at the top
        if self.rect.bottom > scr_height:
            score += 1
            self.rect.top = 0
            self.rect.center = (random.randint(30, scr_width - 30), 0)

class Coin(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("Coin.png")
        self.rect = self.image.get_rect()
        # Set coin spawn position at a random x-coordinate, fixed y = 320
        self.rect.center = (random.randint(40, scr_width - 40), 320)
    
    def disappear(self):
        global coinscore
        coinscore += 1
        # Move coin to a new random x position with fixed y = 320
        self.rect.center = (random.randint(40, scr_width - 40), 320)

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("Player.png")
        self.rect = self.image.get_rect()
        # Set player's starting position
        self.rect.center = (60, 320)
    
    def move(self):
        pressed_keys = pygame.key.get_pressed()
        if pressed_keys[K_LEFT] and self.rect.left > 0:
            self.rect.move_ip(-5, 0)
        if pressed_keys[K_RIGHT] and self.rect.right < scr_width:
            self.rect.move_ip(5, 0)

# Create instances of Player, Enemy, and Coin
P = Player()
E = Enemy()
C = Coin()

# Create sprite groups for collision detection and drawing
Enemies = pygame.sprite.Group()
Enemies.add(E)
Coins = pygame.sprite.Group()
Coins.add(C)
all_sprites = pygame.sprite.Group()
all_sprites.add(E)
all_sprites.add(P)

# Set up a custom event to increase the enemy speed every 10 seconds
UP_SPEED = pygame.USEREVENT + 1
pygame.time.set_timer(UP_SPEED, 10000)

while True:
    for event in pygame.event.get():
        if event.type == UP_SPEED:
            speed += 1
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    # Draw background image
    disp.blit(background, (0, 0))
    
    # Display the score and coin score on the screen
    scores = font_small.render(str(score), True, (0, 0, 0))
    disp.blit(scores, (10, 10))
    coinscores = font_small.render(str(coinscore), True, (0, 0, 0))
    disp.blit(coinscores, (scr_width - 30, 10))
    
    # Draw the coin
    for coin in Coins:
        disp.blit(coin.image, coin.rect)
    
    # Draw and move all sprites (player and enemy)
    for entity in all_sprites:
        disp.blit(entity.image, entity.rect)
        entity.move()
    
    # Check collision between player and enemy (game over)
    if pygame.sprite.spritecollideany(P, Enemies):
        pygame.mixer.Sound("crash.wav").play()
        time.sleep(0.5)
        disp.fill((255, 0, 0))
        disp.blit(game_over, (30, 250))
        pygame.display.update()
        for entity in all_sprites:
            entity.kill()
        time.sleep(2)
        pygame.quit()
        sys.exit()
    
    # Check collision between player and coin (collect coin)
    if pygame.sprite.spritecollideany(P, Coins):
        pygame.mixer.Sound("bell.wav").play()
        pygame.display.update()
        C.disappear()
    
    pygame.display.update()
    FPS.tick(60)

pygame.quit()
sys.exit()
