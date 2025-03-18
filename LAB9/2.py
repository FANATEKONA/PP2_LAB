import pygame, sys, random, time
from pygame.locals import *

pygame.init()

# Window size
WINDOW_WIDTH = 400
WINDOW_HEIGHT = 400
CELL_SIZE = 20

# Grid dimensions
COLS = WINDOW_WIDTH // CELL_SIZE
ROWS = WINDOW_HEIGHT // CELL_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Create game window
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Snake Game with Timed Food")
clock = pygame.time.Clock()

# Function to generate food with different points and a timer
def generate_food(snake_body):
    while True:
        x = random.randint(0, COLS - 1)
        y = random.randint(0, ROWS - 1)
        if (x, y) not in snake_body:  
            food_type = random.choice([(RED, 10), (BLUE, 20), (YELLOW, 30)])  
            return (x, y, food_type[0], food_type[1], time.time() + random.randint(5, 10)) 

# Snake setup
snake = [(COLS // 2, ROWS // 2)]
direction = (1, 0)

# Generate first food
food = generate_food(snake)

# Game variables
score = 0
level = 1
foods_eaten = 0
speed = 3
running = True

# Game loop
while running:
    for event in pygame.event.get():
        if event.type == QUIT:
            running = False
        elif event.type == KEYDOWN:
            if event.key == K_UP and direction != (0, 1):
                direction = (0, -1)
            elif event.key == K_DOWN and direction != (0, -1):
                direction = (0, 1)
            elif event.key == K_LEFT and direction != (1, 0):
                direction = (-1, 0)
            elif event.key == K_RIGHT and direction != (-1, 0):
                direction = (1, 0)

    # Move snake
    head_x, head_y = snake[0]
    new_head = (head_x + direction[0], head_y + direction[1])

    # Check for wall or self collision
    if new_head[0] < 0 or new_head[0] >= COLS or new_head[1] < 0 or new_head[1] >= ROWS or new_head in snake:
        running = False

    # Add new head
    snake.insert(0, new_head)

    # Check if food expired
    if time.time() > food[4]:  
        food = generate_food(snake)  

    # Check if snake eats food
    if new_head[:2] == food[:2]:
        score += food[3]  
        foods_eaten += 1
        food = generate_food(snake)  
        if foods_eaten % 3 == 0:
            level += 1
            speed += 2
    else:
        snake.pop()

    # Draw background
    screen.fill(BLACK)

    # Draw food
    food_rect = pygame.Rect(food[0] * CELL_SIZE, food[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    pygame.draw.rect(screen, food[2], food_rect)  

    # Draw snake
    for segment in snake:
        seg_rect = pygame.Rect(segment[0] * CELL_SIZE, segment[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        pygame.draw.rect(screen, GREEN, seg_rect)

    # Show score and level
    info_text = pygame.font.SysFont("Verdana", 20).render(f"Score: {score}  Level: {level}", True, WHITE)
    screen.blit(info_text, (10, 10))

    pygame.display.update()
    clock.tick(speed)

pygame.quit()
sys.exit()
