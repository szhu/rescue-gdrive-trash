# rescue-gdrive-trash

*I made this script for myself, so it's rough around the edges, and this README is not fully written out. If you have any requests or questions, please file an issue and I'll be happy to fix it up. I check my GitHub notifications regularly.*

## What does this do?

![Screen Shot 2020-10-26 at 10 29 55 PM](https://user-images.githubusercontent.com/1570168/97260837-d8a60380-17da-11eb-839c-3458eecdf4bf.png)

![122883177_384820749260169_5779468821060624886_n](https://user-images.githubusercontent.com/1570168/97259588-5f0d1600-17d8-11eb-8baa-8d2c00b280b0.png)

## How to use it

1. Go to <https://script.google.com/>. Make sure you're signed in with the Google account where you want to restore the trash.
2. Create a new project.
3. Paste the contents of <rescue-gdrive-trash.gs> into the editor.
4. This script logs details about the items in the trash to the log. The main reason for this that after items are moved out of the trash, information about where the item was originally located is lost. It is recommended to set up the BetterLog library, which persists logs to a spreadsheet.
    1. Follow these instructions to add the BetterLog library: <https://github.com/peterherrmann/BetterLog#setup>
    2. Create a new spreadsheet, and paste the spreadsheet ID (in the URL) over `LOG_SPREADSHEET_ID_HERE`.
    - Alternatively, if you are sure you don't want to use BetterLog, just comment out the BetterLog line. If you do this, note that this script will destroy information about where the trashed items were originally located.
5. Create a new folder where trashed items should be moved to, and paste the folder ID (in the URL) over `RESCUED_ITEMS_FOLDER_ID_HERE`.
6. In the function selector, select `rescueAllFiles`, then click run!
7. Things you can monitor while it's running:
    - Google Drive trash -- items should be disappearing
    - The rescued items folder -- items should be appearing
    - The log spreadsheet -- items should be appearing
8. If you get an error of "maximum execution time exceeded", just press Run again, and this script will pick up where it left off. Old logs will not be overwritten. Depending on the number of items in your trash, you may need to do this a few times.
