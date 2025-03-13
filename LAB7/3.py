import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((500, 500))
clock = pygame.time.Clock()

rect = pygame.Rect(200, 110, 50, 50)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                rect.move_ip(-20, 0)
                if rect.left < 0:
                    rect.left = 20
            elif event.key == pygame.K_RIGHT:
                rect.move_ip(20, 0)
                if rect.right > 500:
                    rect.right = 480
            elif event.key == pygame.K_UP:
                rect.move_ip(0, -20)
                if rect.top < 0:
                    rect.top = 20
            elif event.key == pygame.K_DOWN:
                rect.move_ip(0, 20)
                if rect.bottom > 500:
                    rect.bottom = 480

    screen.fill((255, 255, 255))
    pygame.draw.rect(screen, (255, 0, 0), rect)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()
