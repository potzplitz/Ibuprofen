import discord
from discord.ext import commands
import openai
import speech_recognition as sr

# OpenAI API-Schlüssel
openai.api_key = 'sk-proj-5jLZmHTAYBQMRuFZdkxwT3BlbkFJsMmRcfD4tCgsqweWzcbI'

# Initialisiere den Discord-Client
intents = discord.Intents.default()
intents.message_content = True
client = commands.Bot(command_prefix='!', intents=intents)

# Spracherkennung initialisieren
recognizer = sr.Recognizer()

@client.event
async def on_ready():
    print(f'{client.user} hat sich eingeloggt!')

@client.command(name='frage')
async def frage_command(ctx):
    voice_channel = ctx.author.voice.channel
    if voice_channel:  # Überprüfe, ob der Benutzer in einem Sprachkanal ist
        vc = ctx.voice_client
        if vc:
            if vc.channel.id == voice_channel.id:
                # Der Bot ist bereits im angeforderten Sprachkanal verbunden.
                await ctx.send("Bereits verbunden mit dem Sprachkanal.")
            else:
                # Der Bot ist in einem anderen Kanal verbunden, trenne diese Verbindung.
                await vc.disconnect()
        try:
            vc = await voice_channel.connect()
            # Dein Code für das, was der Bot nach dem Verbinden tun soll.
            await ctx.send(f"{client.user} hat dem Sprachkanal '{voice_channel}' beigetreten.")
        except discord.errors.ClientException as e:
            print(f"Fehler beim Verbinden mit dem Sprachkanal: {e}")
            await ctx.send(f"Ein Fehler ist aufgetreten: {e}")

        with sr.Microphone() as source:
            recognizer.adjust_for_ambient_noise(source)
            await ctx.send("Sprich jetzt...")

            audio = recognizer.listen(source)
            try:
                text = recognizer.recognize_google(audio, language="de-DE")
                print(f"Du hast gesagt: {text}")

                # Sende die Frage an OpenAI
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "user", "content": text}
                    ]
                )
                antwort = response['choices'][0]['message']['content']

                # Sende die Antwort zurück
                await ctx.send(antwort)

            except sr.UnknownValueError:
                await ctx.send("Ich konnte dich leider nicht verstehen.")
            except sr.RequestError as e:
                print(f"Fehler bei der Spracherkennung; {e}")
                await ctx.send("Es gab ein Problem beim Zugriff auf den Spracherkennungsdienst.")
            except Exception as e:
                print(e)
                await ctx.send("Es gab ein unerwartetes Problem.")
            
            finally:
                await vc.disconnect()

# Setze deinen Discord-Bot-Token
client.run('MTI1MDA2MjE2NDc5NDkzNzQwNg.GlZdkz.YBNAOCpQL9Xb_y0dswInAYPiRKpLB_-IXAP-gw')
