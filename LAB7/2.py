import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((500, 500))
pygame.display.set_caption("Music Player")

songs = ["1.mp3", "2.mp3", "3.mp3"]
i = 0

pygame.mixer.init()
pygame.mixer.music.load(songs[i])

while True:
    screen.fill((200, 200, 200))
    pygame.display.flip()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_s:
                pygame.mixer.music.play()
            if event.key == pygame.K_LEFT:
                if i > 0:
                    i = i - 1
                else:
                    len(songs) - 1
                pygame.mixer.music.load(songs[i])
                pygame.mixer.music.play()
            elif event.key == pygame.K_RIGHT:
                if i < len(songs) - 1:
                    i = i + 1 
                else:
                    i = 0
                pygame.mixer.music.load(songs[i])
                pygame.mixer.music.play()
            elif event.key == pygame.K_UP:
                pygame.mixer.music.unpause()
            elif event.key == pygame.K_DOWN:
                pygame.mixer.music.pause()

pygame.quit()
sys.exit()
