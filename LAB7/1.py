import pygame
import datetime
import sys

pygame.init()
W,H = 800, 800
sc = pygame.display.set_mode((W,H))
pygame.display.set_caption("Часы Микки Мауса")

background = pygame.image.load('mickey.png')
minute_hand = pygame.image.load('minutes.png')
second_hand = pygame.image.load('seconds.png')

def blitrot(surf,image,pos,angle):
    rotated = pygame.transform.rotate(image, angle)
    new_rect = rotated.get_rect(center = pos)
    surf.blit(rotated, new_rect)

while True:
    sc.fill((255, 255, 255))
    sc.blit(background, (0, 0))

    now = datetime.datetime.now()
    minute_angle = -(now.minute * 6)
    second_angle = -(now.second * 6)

    blitrot(sc, minute_hand, (400, 400), minute_angle)
    blitrot(sc, second_hand, (400, 400), second_angle)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.flip()
    pygame.time.delay(50)