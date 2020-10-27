Logger = BetterLog.useSpreadsheet("LOG_SPREADSHEET_ID_HERE"); 

let rescued = DriveApp.getFolderById("RESCUED_ITEMS_FOLDER_ID_HERE")

let DO_RESCUE = true;

/**
* Untrash then move all trashed files to rescue folder.
* Based on: http://stackoverflow.com/a/14541247/1677912
*/
function rescueAllFiles() {
  let trashFilesIter = DriveApp.searchFiles('trashed=true');
  while (trashFilesIter.hasNext()) {
    let item = trashFilesIter.next();
    processItem(item);
  }
  
  let trashFoldersIter = DriveApp.searchFolders('trashed=true');
  while (trashFoldersIter.hasNext()) {
    let item = trashFoldersIter.next();
    processItem(item);
  }
};

function processItem(item) {
  Logger.log([
    "",
    "📄 FILE",
    item.getName(),
    item.getUrl(),
    "🗓 DATE",
    `Updated ${item.getLastUpdated().toISOString()}`,
    `Created ${item.getDateCreated().toISOString()}`,
    "📂 PATHS",
    ...formatPaths(item),
  ].join("\n"));
  
  if (DO_RESCUE) {
    item.moveTo(rescued);
    item.setTrashed(false);
  }
}

function mapParents(item, f = undefined) {
  let results = [];
  let parentIter = item.getParents();
  while (parentIter.hasNext()) {
    results.push(f ? f(parentIter.next()) : parentIter.next());
  }
  return results;
}

function formatPaths(item) {
  return mapParents(item, function (parent) {
    let pathName = [
      ...mapFirstParentChain(parent, (ancestor) => ancestor.getName()),
      item.getName(),
    ].join(" » ");
    return [pathName, parent.getUrl()].join("\n");
  });
}

function mapFirstParentChain(cur, f = undefined) {
  let results = [];
  while (cur) {
    results.unshift(f ? f(cur) : cur);
    
    let parentIter = cur.getParents();
    cur = parentIter.hasNext() && parentIter.next();
  }
  return results;
}

function syntaxCheck() {}
