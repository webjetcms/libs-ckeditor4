/*
	Author	: Michael Janea (www.michaeljanea.com)
	Version	: 1.2
*/

var fontawesome = '';

/*
//https://fontawesome.com/v5/cheatsheet
var icons = document.getElementsByClassName('icon');
for (const icon of icons) {
  const name = icon.getElementsByTagName('dd')[0].innerText;
  console.log("icons[counter++] = Array('fa-"+name+"', '"+name+"');");
}
*/

var icons = Array();
var counter = 0;

icons[counter++] = Array('fa-ad', 'ad');
icons[counter++] = Array('fa-address-book', 'address-book');
icons[counter++] = Array('fa-address-card', 'address-card');
icons[counter++] = Array('fa-adjust', 'adjust');
icons[counter++] = Array('fa-air-freshener', 'air-freshener');
icons[counter++] = Array('fa-align-center', 'align-center');
icons[counter++] = Array('fa-align-justify', 'align-justify');
icons[counter++] = Array('fa-align-left', 'align-left');
icons[counter++] = Array('fa-align-right', 'align-right');
icons[counter++] = Array('fa-allergies', 'allergies');
icons[counter++] = Array('fa-ambulance', 'ambulance');
icons[counter++] = Array('fa-american-sign-language-interpreting', 'american-sign-language-interpreting');
icons[counter++] = Array('fa-anchor', 'anchor');
icons[counter++] = Array('fa-angle-double-down', 'angle-double-down');
icons[counter++] = Array('fa-angle-double-left', 'angle-double-left');
icons[counter++] = Array('fa-angle-double-right', 'angle-double-right');
icons[counter++] = Array('fa-angle-double-up', 'angle-double-up');
icons[counter++] = Array('fa-angle-down', 'angle-down');
icons[counter++] = Array('fa-angle-left', 'angle-left');
icons[counter++] = Array('fa-angle-right', 'angle-right');
icons[counter++] = Array('fa-angle-up', 'angle-up');
icons[counter++] = Array('fa-angry', 'angry');
icons[counter++] = Array('fa-ankh', 'ankh');
icons[counter++] = Array('fa-apple-alt', 'apple-alt');
icons[counter++] = Array('fa-archive', 'archive');
icons[counter++] = Array('fa-archway', 'archway');
icons[counter++] = Array('fa-arrow-alt-circle-down', 'arrow-alt-circle-down');
icons[counter++] = Array('fa-arrow-alt-circle-left', 'arrow-alt-circle-left');
icons[counter++] = Array('fa-arrow-alt-circle-right', 'arrow-alt-circle-right');
icons[counter++] = Array('fa-arrow-alt-circle-up', 'arrow-alt-circle-up');
icons[counter++] = Array('fa-arrow-circle-down', 'arrow-circle-down');
icons[counter++] = Array('fa-arrow-circle-left', 'arrow-circle-left');
icons[counter++] = Array('fa-arrow-circle-right', 'arrow-circle-right');
icons[counter++] = Array('fa-arrow-circle-up', 'arrow-circle-up');
icons[counter++] = Array('fa-arrow-down', 'arrow-down');
icons[counter++] = Array('fa-arrow-left', 'arrow-left');
icons[counter++] = Array('fa-arrow-right', 'arrow-right');
icons[counter++] = Array('fa-arrow-up', 'arrow-up');
icons[counter++] = Array('fa-arrows-alt', 'arrows-alt');
icons[counter++] = Array('fa-arrows-alt-h', 'arrows-alt-h');
icons[counter++] = Array('fa-arrows-alt-v', 'arrows-alt-v');
icons[counter++] = Array('fa-assistive-listening-systems', 'assistive-listening-systems');
icons[counter++] = Array('fa-asterisk', 'asterisk');
icons[counter++] = Array('fa-at', 'at');
icons[counter++] = Array('fa-atlas', 'atlas');
icons[counter++] = Array('fa-atom', 'atom');
icons[counter++] = Array('fa-audio-description', 'audio-description');
icons[counter++] = Array('fa-award', 'award');
icons[counter++] = Array('fa-baby', 'baby');
icons[counter++] = Array('fa-baby-carriage', 'baby-carriage');
icons[counter++] = Array('fa-backspace', 'backspace');
icons[counter++] = Array('fa-backward', 'backward');
icons[counter++] = Array('fa-bacon', 'bacon');
icons[counter++] = Array('fa-bacteria', 'bacteria');
icons[counter++] = Array('fa-bacterium', 'bacterium');
icons[counter++] = Array('fa-bahai', 'bahai');
icons[counter++] = Array('fa-balance-scale', 'balance-scale');
icons[counter++] = Array('fa-balance-scale-left', 'balance-scale-left');
icons[counter++] = Array('fa-balance-scale-right', 'balance-scale-right');
icons[counter++] = Array('fa-ban', 'ban');
icons[counter++] = Array('fa-band-aid', 'band-aid');
icons[counter++] = Array('fa-barcode', 'barcode');
icons[counter++] = Array('fa-bars', 'bars');
icons[counter++] = Array('fa-baseball-ball', 'baseball-ball');
icons[counter++] = Array('fa-basketball-ball', 'basketball-ball');
icons[counter++] = Array('fa-bath', 'bath');
icons[counter++] = Array('fa-battery-empty', 'battery-empty');
icons[counter++] = Array('fa-battery-full', 'battery-full');
icons[counter++] = Array('fa-battery-half', 'battery-half');
icons[counter++] = Array('fa-battery-quarter', 'battery-quarter');
icons[counter++] = Array('fa-battery-three-quarters', 'battery-three-quarters');
icons[counter++] = Array('fa-bed', 'bed');
icons[counter++] = Array('fa-beer', 'beer');
icons[counter++] = Array('fa-bell', 'bell');
icons[counter++] = Array('fa-bell-slash', 'bell-slash');
icons[counter++] = Array('fa-bezier-curve', 'bezier-curve');
icons[counter++] = Array('fa-bible', 'bible');
icons[counter++] = Array('fa-bicycle', 'bicycle');
icons[counter++] = Array('fa-biking', 'biking');
icons[counter++] = Array('fa-binoculars', 'binoculars');
icons[counter++] = Array('fa-biohazard', 'biohazard');
icons[counter++] = Array('fa-birthday-cake', 'birthday-cake');
icons[counter++] = Array('fa-blender', 'blender');
icons[counter++] = Array('fa-blender-phone', 'blender-phone');
icons[counter++] = Array('fa-blind', 'blind');
icons[counter++] = Array('fa-blog', 'blog');
icons[counter++] = Array('fa-bold', 'bold');
icons[counter++] = Array('fa-bolt', 'bolt');
icons[counter++] = Array('fa-bomb', 'bomb');
icons[counter++] = Array('fa-bone', 'bone');
icons[counter++] = Array('fa-bong', 'bong');
icons[counter++] = Array('fa-book', 'book');
icons[counter++] = Array('fa-book-dead', 'book-dead');
icons[counter++] = Array('fa-book-medical', 'book-medical');
icons[counter++] = Array('fa-book-open', 'book-open');
icons[counter++] = Array('fa-book-reader', 'book-reader');
icons[counter++] = Array('fa-bookmark', 'bookmark');
icons[counter++] = Array('fa-border-all', 'border-all');
icons[counter++] = Array('fa-border-none', 'border-none');
icons[counter++] = Array('fa-border-style', 'border-style');
icons[counter++] = Array('fa-bowling-ball', 'bowling-ball');
icons[counter++] = Array('fa-box', 'box');
icons[counter++] = Array('fa-box-open', 'box-open');
icons[counter++] = Array('fa-box-tissue', 'box-tissue');
icons[counter++] = Array('fa-boxes', 'boxes');
icons[counter++] = Array('fa-braille', 'braille');
icons[counter++] = Array('fa-brain', 'brain');
icons[counter++] = Array('fa-bread-slice', 'bread-slice');
icons[counter++] = Array('fa-briefcase', 'briefcase');
icons[counter++] = Array('fa-briefcase-medical', 'briefcase-medical');
icons[counter++] = Array('fa-broadcast-tower', 'broadcast-tower');
icons[counter++] = Array('fa-broom', 'broom');
icons[counter++] = Array('fa-brush', 'brush');
icons[counter++] = Array('fa-bug', 'bug');
icons[counter++] = Array('fa-building', 'building');
icons[counter++] = Array('fa-bullhorn', 'bullhorn');
icons[counter++] = Array('fa-bullseye', 'bullseye');
icons[counter++] = Array('fa-burn', 'burn');
icons[counter++] = Array('fa-bus', 'bus');
icons[counter++] = Array('fa-bus-alt', 'bus-alt');
icons[counter++] = Array('fa-business-time', 'business-time');
icons[counter++] = Array('fa-calculator', 'calculator');
icons[counter++] = Array('fa-calendar', 'calendar');
icons[counter++] = Array('fa-calendar-alt', 'calendar-alt');
icons[counter++] = Array('fa-calendar-check', 'calendar-check');
icons[counter++] = Array('fa-calendar-day', 'calendar-day');
icons[counter++] = Array('fa-calendar-minus', 'calendar-minus');
icons[counter++] = Array('fa-calendar-plus', 'calendar-plus');
icons[counter++] = Array('fa-calendar-times', 'calendar-times');
icons[counter++] = Array('fa-calendar-week', 'calendar-week');
icons[counter++] = Array('fa-camera', 'camera');
icons[counter++] = Array('fa-camera-retro', 'camera-retro');
icons[counter++] = Array('fa-campground', 'campground');
icons[counter++] = Array('fa-candy-cane', 'candy-cane');
icons[counter++] = Array('fa-cannabis', 'cannabis');
icons[counter++] = Array('fa-capsules', 'capsules');
icons[counter++] = Array('fa-car', 'car');
icons[counter++] = Array('fa-car-alt', 'car-alt');
icons[counter++] = Array('fa-car-battery', 'car-battery');
icons[counter++] = Array('fa-car-crash', 'car-crash');
icons[counter++] = Array('fa-car-side', 'car-side');
icons[counter++] = Array('fa-caravan', 'caravan');
icons[counter++] = Array('fa-caret-down', 'caret-down');
icons[counter++] = Array('fa-caret-left', 'caret-left');
icons[counter++] = Array('fa-caret-right', 'caret-right');
icons[counter++] = Array('fa-caret-square-down', 'caret-square-down');
icons[counter++] = Array('fa-caret-square-left', 'caret-square-left');
icons[counter++] = Array('fa-caret-square-right', 'caret-square-right');
icons[counter++] = Array('fa-caret-square-up', 'caret-square-up');
icons[counter++] = Array('fa-caret-up', 'caret-up');
icons[counter++] = Array('fa-carrot', 'carrot');
icons[counter++] = Array('fa-cart-arrow-down', 'cart-arrow-down');
icons[counter++] = Array('fa-cart-plus', 'cart-plus');
icons[counter++] = Array('fa-cash-register', 'cash-register');
icons[counter++] = Array('fa-cat', 'cat');
icons[counter++] = Array('fa-certificate', 'certificate');
icons[counter++] = Array('fa-chair', 'chair');
icons[counter++] = Array('fa-chalkboard', 'chalkboard');
icons[counter++] = Array('fa-chalkboard-teacher', 'chalkboard-teacher');
icons[counter++] = Array('fa-charging-station', 'charging-station');
icons[counter++] = Array('fa-chart-area', 'chart-area');
icons[counter++] = Array('fa-chart-bar', 'chart-bar');
icons[counter++] = Array('fa-chart-line', 'chart-line');
icons[counter++] = Array('fa-chart-pie', 'chart-pie');
icons[counter++] = Array('fa-check', 'check');
icons[counter++] = Array('fa-check-circle', 'check-circle');
icons[counter++] = Array('fa-check-double', 'check-double');
icons[counter++] = Array('fa-check-square', 'check-square');
icons[counter++] = Array('fa-cheese', 'cheese');
icons[counter++] = Array('fa-chess', 'chess');
icons[counter++] = Array('fa-chess-bishop', 'chess-bishop');
icons[counter++] = Array('fa-chess-board', 'chess-board');
icons[counter++] = Array('fa-chess-king', 'chess-king');
icons[counter++] = Array('fa-chess-knight', 'chess-knight');
icons[counter++] = Array('fa-chess-pawn', 'chess-pawn');
icons[counter++] = Array('fa-chess-queen', 'chess-queen');
icons[counter++] = Array('fa-chess-rook', 'chess-rook');
icons[counter++] = Array('fa-chevron-circle-down', 'chevron-circle-down');
icons[counter++] = Array('fa-chevron-circle-left', 'chevron-circle-left');
icons[counter++] = Array('fa-chevron-circle-right', 'chevron-circle-right');
icons[counter++] = Array('fa-chevron-circle-up', 'chevron-circle-up');
icons[counter++] = Array('fa-chevron-down', 'chevron-down');
icons[counter++] = Array('fa-chevron-left', 'chevron-left');
icons[counter++] = Array('fa-chevron-right', 'chevron-right');
icons[counter++] = Array('fa-chevron-up', 'chevron-up');
icons[counter++] = Array('fa-child', 'child');
icons[counter++] = Array('fa-church', 'church');
icons[counter++] = Array('fa-circle', 'circle');
icons[counter++] = Array('fa-circle-notch', 'circle-notch');
icons[counter++] = Array('fa-city', 'city');
icons[counter++] = Array('fa-clinic-medical', 'clinic-medical');
icons[counter++] = Array('fa-clipboard', 'clipboard');
icons[counter++] = Array('fa-clipboard-check', 'clipboard-check');
icons[counter++] = Array('fa-clipboard-list', 'clipboard-list');
icons[counter++] = Array('fa-clock', 'clock');
icons[counter++] = Array('fa-clone', 'clone');
icons[counter++] = Array('fa-closed-captioning', 'closed-captioning');
icons[counter++] = Array('fa-cloud', 'cloud');
icons[counter++] = Array('fa-cloud-download-alt', 'cloud-download-alt');
icons[counter++] = Array('fa-cloud-meatball', 'cloud-meatball');
icons[counter++] = Array('fa-cloud-moon', 'cloud-moon');
icons[counter++] = Array('fa-cloud-moon-rain', 'cloud-moon-rain');
icons[counter++] = Array('fa-cloud-rain', 'cloud-rain');
icons[counter++] = Array('fa-cloud-showers-heavy', 'cloud-showers-heavy');
icons[counter++] = Array('fa-cloud-sun', 'cloud-sun');
icons[counter++] = Array('fa-cloud-sun-rain', 'cloud-sun-rain');
icons[counter++] = Array('fa-cloud-upload-alt', 'cloud-upload-alt');
icons[counter++] = Array('fa-cocktail', 'cocktail');
icons[counter++] = Array('fa-code', 'code');
icons[counter++] = Array('fa-code-branch', 'code-branch');
icons[counter++] = Array('fa-coffee', 'coffee');
icons[counter++] = Array('fa-cog', 'cog');
icons[counter++] = Array('fa-cogs', 'cogs');
icons[counter++] = Array('fa-coins', 'coins');
icons[counter++] = Array('fa-columns', 'columns');
icons[counter++] = Array('fa-comment', 'comment');
icons[counter++] = Array('fa-comment-alt', 'comment-alt');
icons[counter++] = Array('fa-comment-dollar', 'comment-dollar');
icons[counter++] = Array('fa-comment-dots', 'comment-dots');
icons[counter++] = Array('fa-comment-medical', 'comment-medical');
icons[counter++] = Array('fa-comment-slash', 'comment-slash');
icons[counter++] = Array('fa-comments', 'comments');
icons[counter++] = Array('fa-comments-dollar', 'comments-dollar');
icons[counter++] = Array('fa-compact-disc', 'compact-disc');
icons[counter++] = Array('fa-compass', 'compass');
icons[counter++] = Array('fa-compress', 'compress');
icons[counter++] = Array('fa-compress-alt', 'compress-alt');
icons[counter++] = Array('fa-compress-arrows-alt', 'compress-arrows-alt');
icons[counter++] = Array('fa-concierge-bell', 'concierge-bell');
icons[counter++] = Array('fa-cookie', 'cookie');
icons[counter++] = Array('fa-cookie-bite', 'cookie-bite');
icons[counter++] = Array('fa-copy', 'copy');
icons[counter++] = Array('fa-copyright', 'copyright');
icons[counter++] = Array('fa-couch', 'couch');
icons[counter++] = Array('fa-credit-card', 'credit-card');
icons[counter++] = Array('fa-crop', 'crop');
icons[counter++] = Array('fa-crop-alt', 'crop-alt');
icons[counter++] = Array('fa-cross', 'cross');
icons[counter++] = Array('fa-crosshairs', 'crosshairs');
icons[counter++] = Array('fa-crow', 'crow');
icons[counter++] = Array('fa-crown', 'crown');
icons[counter++] = Array('fa-crutch', 'crutch');
icons[counter++] = Array('fa-cube', 'cube');
icons[counter++] = Array('fa-cubes', 'cubes');
icons[counter++] = Array('fa-cut', 'cut');
icons[counter++] = Array('fa-database', 'database');
icons[counter++] = Array('fa-deaf', 'deaf');
icons[counter++] = Array('fa-democrat', 'democrat');
icons[counter++] = Array('fa-desktop', 'desktop');
icons[counter++] = Array('fa-dharmachakra', 'dharmachakra');
icons[counter++] = Array('fa-diagnoses', 'diagnoses');
icons[counter++] = Array('fa-dice', 'dice');
icons[counter++] = Array('fa-dice-d20', 'dice-d20');
icons[counter++] = Array('fa-dice-d6', 'dice-d6');
icons[counter++] = Array('fa-dice-five', 'dice-five');
icons[counter++] = Array('fa-dice-four', 'dice-four');
icons[counter++] = Array('fa-dice-one', 'dice-one');
icons[counter++] = Array('fa-dice-six', 'dice-six');
icons[counter++] = Array('fa-dice-three', 'dice-three');
icons[counter++] = Array('fa-dice-two', 'dice-two');
icons[counter++] = Array('fa-digital-tachograph', 'digital-tachograph');
icons[counter++] = Array('fa-directions', 'directions');
icons[counter++] = Array('fa-disease', 'disease');
icons[counter++] = Array('fa-divide', 'divide');
icons[counter++] = Array('fa-dizzy', 'dizzy');
icons[counter++] = Array('fa-dna', 'dna');
icons[counter++] = Array('fa-dog', 'dog');
icons[counter++] = Array('fa-dollar-sign', 'dollar-sign');
icons[counter++] = Array('fa-dolly', 'dolly');
icons[counter++] = Array('fa-dolly-flatbed', 'dolly-flatbed');
icons[counter++] = Array('fa-donate', 'donate');
icons[counter++] = Array('fa-door-closed', 'door-closed');
icons[counter++] = Array('fa-door-open', 'door-open');
icons[counter++] = Array('fa-dot-circle', 'dot-circle');
icons[counter++] = Array('fa-dove', 'dove');
icons[counter++] = Array('fa-download', 'download');
icons[counter++] = Array('fa-drafting-compass', 'drafting-compass');
icons[counter++] = Array('fa-dragon', 'dragon');
icons[counter++] = Array('fa-draw-polygon', 'draw-polygon');
icons[counter++] = Array('fa-drum', 'drum');
icons[counter++] = Array('fa-drum-steelpan', 'drum-steelpan');
icons[counter++] = Array('fa-drumstick-bite', 'drumstick-bite');
icons[counter++] = Array('fa-dumbbell', 'dumbbell');
icons[counter++] = Array('fa-dumpster', 'dumpster');
icons[counter++] = Array('fa-dumpster-fire', 'dumpster-fire');
icons[counter++] = Array('fa-dungeon', 'dungeon');
icons[counter++] = Array('fa-edit', 'edit');
icons[counter++] = Array('fa-egg', 'egg');
icons[counter++] = Array('fa-eject', 'eject');
icons[counter++] = Array('fa-ellipsis-h', 'ellipsis-h');
icons[counter++] = Array('fa-ellipsis-v', 'ellipsis-v');
icons[counter++] = Array('fa-envelope', 'envelope');
icons[counter++] = Array('fa-envelope-open', 'envelope-open');
icons[counter++] = Array('fa-envelope-open-text', 'envelope-open-text');
icons[counter++] = Array('fa-envelope-square', 'envelope-square');
icons[counter++] = Array('fa-equals', 'equals');
icons[counter++] = Array('fa-eraser', 'eraser');
icons[counter++] = Array('fa-ethernet', 'ethernet');
icons[counter++] = Array('fa-euro-sign', 'euro-sign');
icons[counter++] = Array('fa-exchange-alt', 'exchange-alt');
icons[counter++] = Array('fa-exclamation', 'exclamation');
icons[counter++] = Array('fa-exclamation-circle', 'exclamation-circle');
icons[counter++] = Array('fa-exclamation-triangle', 'exclamation-triangle');
icons[counter++] = Array('fa-expand', 'expand');
icons[counter++] = Array('fa-expand-alt', 'expand-alt');
icons[counter++] = Array('fa-expand-arrows-alt', 'expand-arrows-alt');
icons[counter++] = Array('fa-external-link-alt', 'external-link-alt');
icons[counter++] = Array('fa-external-link-square-alt', 'external-link-square-alt');
icons[counter++] = Array('fa-eye', 'eye');
icons[counter++] = Array('fa-eye-dropper', 'eye-dropper');
icons[counter++] = Array('fa-eye-slash', 'eye-slash');
icons[counter++] = Array('fa-fan', 'fan');
icons[counter++] = Array('fa-fast-backward', 'fast-backward');
icons[counter++] = Array('fa-fast-forward', 'fast-forward');
icons[counter++] = Array('fa-faucet', 'faucet');
icons[counter++] = Array('fa-fax', 'fax');
icons[counter++] = Array('fa-feather', 'feather');
icons[counter++] = Array('fa-feather-alt', 'feather-alt');
icons[counter++] = Array('fa-female', 'female');
icons[counter++] = Array('fa-fighter-jet', 'fighter-jet');
icons[counter++] = Array('fa-file', 'file');
icons[counter++] = Array('fa-file-alt', 'file-alt');
icons[counter++] = Array('fa-file-archive', 'file-archive');
icons[counter++] = Array('fa-file-audio', 'file-audio');
icons[counter++] = Array('fa-file-code', 'file-code');
icons[counter++] = Array('fa-file-contract', 'file-contract');
icons[counter++] = Array('fa-file-csv', 'file-csv');
icons[counter++] = Array('fa-file-download', 'file-download');
icons[counter++] = Array('fa-file-excel', 'file-excel');
icons[counter++] = Array('fa-file-export', 'file-export');
icons[counter++] = Array('fa-file-image', 'file-image');
icons[counter++] = Array('fa-file-import', 'file-import');
icons[counter++] = Array('fa-file-invoice', 'file-invoice');
icons[counter++] = Array('fa-file-invoice-dollar', 'file-invoice-dollar');
icons[counter++] = Array('fa-file-medical', 'file-medical');
icons[counter++] = Array('fa-file-medical-alt', 'file-medical-alt');
icons[counter++] = Array('fa-file-pdf', 'file-pdf');
icons[counter++] = Array('fa-file-powerpoint', 'file-powerpoint');
icons[counter++] = Array('fa-file-prescription', 'file-prescription');
icons[counter++] = Array('fa-file-signature', 'file-signature');
icons[counter++] = Array('fa-file-upload', 'file-upload');
icons[counter++] = Array('fa-file-video', 'file-video');
icons[counter++] = Array('fa-file-word', 'file-word');
icons[counter++] = Array('fa-fill', 'fill');
icons[counter++] = Array('fa-fill-drip', 'fill-drip');
icons[counter++] = Array('fa-film', 'film');
icons[counter++] = Array('fa-filter', 'filter');
icons[counter++] = Array('fa-fingerprint', 'fingerprint');
icons[counter++] = Array('fa-fire', 'fire');
icons[counter++] = Array('fa-fire-alt', 'fire-alt');
icons[counter++] = Array('fa-fire-extinguisher', 'fire-extinguisher');
icons[counter++] = Array('fa-first-aid', 'first-aid');
icons[counter++] = Array('fa-fish', 'fish');
icons[counter++] = Array('fa-fist-raised', 'fist-raised');
icons[counter++] = Array('fa-flag', 'flag');
icons[counter++] = Array('fa-flag-checkered', 'flag-checkered');
icons[counter++] = Array('fa-flag-usa', 'flag-usa');
icons[counter++] = Array('fa-flask', 'flask');
icons[counter++] = Array('fa-flushed', 'flushed');
icons[counter++] = Array('fa-folder', 'folder');
icons[counter++] = Array('fa-folder-minus', 'folder-minus');
icons[counter++] = Array('fa-folder-open', 'folder-open');
icons[counter++] = Array('fa-folder-plus', 'folder-plus');
icons[counter++] = Array('fa-font', 'font');
icons[counter++] = Array('fa-football-ball', 'football-ball');
icons[counter++] = Array('fa-forward', 'forward');
icons[counter++] = Array('fa-frog', 'frog');
icons[counter++] = Array('fa-frown', 'frown');
icons[counter++] = Array('fa-frown-open', 'frown-open');
icons[counter++] = Array('fa-funnel-dollar', 'funnel-dollar');
icons[counter++] = Array('fa-futbol', 'futbol');
icons[counter++] = Array('fa-gamepad', 'gamepad');
icons[counter++] = Array('fa-gas-pump', 'gas-pump');
icons[counter++] = Array('fa-gavel', 'gavel');
icons[counter++] = Array('fa-gem', 'gem');
icons[counter++] = Array('fa-genderless', 'genderless');
icons[counter++] = Array('fa-ghost', 'ghost');
icons[counter++] = Array('fa-gift', 'gift');
icons[counter++] = Array('fa-gifts', 'gifts');
icons[counter++] = Array('fa-glass-cheers', 'glass-cheers');
icons[counter++] = Array('fa-glass-martini', 'glass-martini');
icons[counter++] = Array('fa-glass-martini-alt', 'glass-martini-alt');
icons[counter++] = Array('fa-glass-whiskey', 'glass-whiskey');
icons[counter++] = Array('fa-glasses', 'glasses');
icons[counter++] = Array('fa-globe', 'globe');
icons[counter++] = Array('fa-globe-africa', 'globe-africa');
icons[counter++] = Array('fa-globe-americas', 'globe-americas');
icons[counter++] = Array('fa-globe-asia', 'globe-asia');
icons[counter++] = Array('fa-globe-europe', 'globe-europe');
icons[counter++] = Array('fa-golf-ball', 'golf-ball');
icons[counter++] = Array('fa-gopuram', 'gopuram');
icons[counter++] = Array('fa-graduation-cap', 'graduation-cap');
icons[counter++] = Array('fa-greater-than', 'greater-than');
icons[counter++] = Array('fa-greater-than-equal', 'greater-than-equal');
icons[counter++] = Array('fa-grimace', 'grimace');
icons[counter++] = Array('fa-grin', 'grin');
icons[counter++] = Array('fa-grin-alt', 'grin-alt');
icons[counter++] = Array('fa-grin-beam', 'grin-beam');
icons[counter++] = Array('fa-grin-beam-sweat', 'grin-beam-sweat');
icons[counter++] = Array('fa-grin-hearts', 'grin-hearts');
icons[counter++] = Array('fa-grin-squint', 'grin-squint');
icons[counter++] = Array('fa-grin-squint-tears', 'grin-squint-tears');
icons[counter++] = Array('fa-grin-stars', 'grin-stars');
icons[counter++] = Array('fa-grin-tears', 'grin-tears');
icons[counter++] = Array('fa-grin-tongue', 'grin-tongue');
icons[counter++] = Array('fa-grin-tongue-squint', 'grin-tongue-squint');
icons[counter++] = Array('fa-grin-tongue-wink', 'grin-tongue-wink');
icons[counter++] = Array('fa-grin-wink', 'grin-wink');
icons[counter++] = Array('fa-grip-horizontal', 'grip-horizontal');
icons[counter++] = Array('fa-grip-lines', 'grip-lines');
icons[counter++] = Array('fa-grip-lines-vertical', 'grip-lines-vertical');
icons[counter++] = Array('fa-grip-vertical', 'grip-vertical');
icons[counter++] = Array('fa-guitar', 'guitar');
icons[counter++] = Array('fa-h-square', 'h-square');
icons[counter++] = Array('fa-hamburger', 'hamburger');
icons[counter++] = Array('fa-hammer', 'hammer');
icons[counter++] = Array('fa-hamsa', 'hamsa');
icons[counter++] = Array('fa-hand-holding', 'hand-holding');
icons[counter++] = Array('fa-hand-holding-heart', 'hand-holding-heart');
icons[counter++] = Array('fa-hand-holding-medical', 'hand-holding-medical');
icons[counter++] = Array('fa-hand-holding-usd', 'hand-holding-usd');
icons[counter++] = Array('fa-hand-holding-water', 'hand-holding-water');
icons[counter++] = Array('fa-hand-lizard', 'hand-lizard');
icons[counter++] = Array('fa-hand-middle-finger', 'hand-middle-finger');
icons[counter++] = Array('fa-hand-paper', 'hand-paper');
icons[counter++] = Array('fa-hand-peace', 'hand-peace');
icons[counter++] = Array('fa-hand-point-down', 'hand-point-down');
icons[counter++] = Array('fa-hand-point-left', 'hand-point-left');
icons[counter++] = Array('fa-hand-point-right', 'hand-point-right');
icons[counter++] = Array('fa-hand-point-up', 'hand-point-up');
icons[counter++] = Array('fa-hand-pointer', 'hand-pointer');
icons[counter++] = Array('fa-hand-rock', 'hand-rock');
icons[counter++] = Array('fa-hand-scissors', 'hand-scissors');
icons[counter++] = Array('fa-hand-sparkles', 'hand-sparkles');
icons[counter++] = Array('fa-hand-spock', 'hand-spock');
icons[counter++] = Array('fa-hands', 'hands');
icons[counter++] = Array('fa-hands-helping', 'hands-helping');
icons[counter++] = Array('fa-hands-wash', 'hands-wash');
icons[counter++] = Array('fa-handshake', 'handshake');
icons[counter++] = Array('fa-handshake-alt-slash', 'handshake-alt-slash');
icons[counter++] = Array('fa-handshake-slash', 'handshake-slash');
icons[counter++] = Array('fa-hanukiah', 'hanukiah');
icons[counter++] = Array('fa-hard-hat', 'hard-hat');
icons[counter++] = Array('fa-hashtag', 'hashtag');
icons[counter++] = Array('fa-hat-cowboy', 'hat-cowboy');
icons[counter++] = Array('fa-hat-cowboy-side', 'hat-cowboy-side');
icons[counter++] = Array('fa-hat-wizard', 'hat-wizard');
icons[counter++] = Array('fa-hdd', 'hdd');
icons[counter++] = Array('fa-head-side-cough', 'head-side-cough');
icons[counter++] = Array('fa-head-side-cough-slash', 'head-side-cough-slash');
icons[counter++] = Array('fa-head-side-mask', 'head-side-mask');
icons[counter++] = Array('fa-head-side-virus', 'head-side-virus');
icons[counter++] = Array('fa-heading', 'heading');
icons[counter++] = Array('fa-headphones', 'headphones');
icons[counter++] = Array('fa-headphones-alt', 'headphones-alt');
icons[counter++] = Array('fa-headset', 'headset');
icons[counter++] = Array('fa-heart', 'heart');
icons[counter++] = Array('fa-heart-broken', 'heart-broken');
icons[counter++] = Array('fa-heartbeat', 'heartbeat');
icons[counter++] = Array('fa-helicopter', 'helicopter');
icons[counter++] = Array('fa-highlighter', 'highlighter');
icons[counter++] = Array('fa-hiking', 'hiking');
icons[counter++] = Array('fa-hippo', 'hippo');
icons[counter++] = Array('fa-history', 'history');
icons[counter++] = Array('fa-hockey-puck', 'hockey-puck');
icons[counter++] = Array('fa-holly-berry', 'holly-berry');
icons[counter++] = Array('fa-home', 'home');
icons[counter++] = Array('fa-horse', 'horse');
icons[counter++] = Array('fa-horse-head', 'horse-head');
icons[counter++] = Array('fa-hospital', 'hospital');
icons[counter++] = Array('fa-hospital-alt', 'hospital-alt');
icons[counter++] = Array('fa-hospital-symbol', 'hospital-symbol');
icons[counter++] = Array('fa-hospital-user', 'hospital-user');
icons[counter++] = Array('fa-hot-tub', 'hot-tub');
icons[counter++] = Array('fa-hotdog', 'hotdog');
icons[counter++] = Array('fa-hotel', 'hotel');
icons[counter++] = Array('fa-hourglass', 'hourglass');
icons[counter++] = Array('fa-hourglass-end', 'hourglass-end');
icons[counter++] = Array('fa-hourglass-half', 'hourglass-half');
icons[counter++] = Array('fa-hourglass-start', 'hourglass-start');
icons[counter++] = Array('fa-house-damage', 'house-damage');
icons[counter++] = Array('fa-house-user', 'house-user');
icons[counter++] = Array('fa-hryvnia', 'hryvnia');
icons[counter++] = Array('fa-i-cursor', 'i-cursor');
icons[counter++] = Array('fa-ice-cream', 'ice-cream');
icons[counter++] = Array('fa-icicles', 'icicles');
icons[counter++] = Array('fa-icons', 'icons');
icons[counter++] = Array('fa-id-badge', 'id-badge');
icons[counter++] = Array('fa-id-card', 'id-card');
icons[counter++] = Array('fa-id-card-alt', 'id-card-alt');
icons[counter++] = Array('fa-igloo', 'igloo');
icons[counter++] = Array('fa-image', 'image');
icons[counter++] = Array('fa-images', 'images');
icons[counter++] = Array('fa-inbox', 'inbox');
icons[counter++] = Array('fa-indent', 'indent');
icons[counter++] = Array('fa-industry', 'industry');
icons[counter++] = Array('fa-infinity', 'infinity');
icons[counter++] = Array('fa-info', 'info');
icons[counter++] = Array('fa-info-circle', 'info-circle');
icons[counter++] = Array('fa-italic', 'italic');
icons[counter++] = Array('fa-jedi', 'jedi');
icons[counter++] = Array('fa-joint', 'joint');
icons[counter++] = Array('fa-journal-whills', 'journal-whills');
icons[counter++] = Array('fa-kaaba', 'kaaba');
icons[counter++] = Array('fa-key', 'key');
icons[counter++] = Array('fa-keyboard', 'keyboard');
icons[counter++] = Array('fa-khanda', 'khanda');
icons[counter++] = Array('fa-kiss', 'kiss');
icons[counter++] = Array('fa-kiss-beam', 'kiss-beam');
icons[counter++] = Array('fa-kiss-wink-heart', 'kiss-wink-heart');
icons[counter++] = Array('fa-kiwi-bird', 'kiwi-bird');
icons[counter++] = Array('fa-landmark', 'landmark');
icons[counter++] = Array('fa-language', 'language');
icons[counter++] = Array('fa-laptop', 'laptop');
icons[counter++] = Array('fa-laptop-code', 'laptop-code');
icons[counter++] = Array('fa-laptop-house', 'laptop-house');
icons[counter++] = Array('fa-laptop-medical', 'laptop-medical');
icons[counter++] = Array('fa-laugh', 'laugh');
icons[counter++] = Array('fa-laugh-beam', 'laugh-beam');
icons[counter++] = Array('fa-laugh-squint', 'laugh-squint');
icons[counter++] = Array('fa-laugh-wink', 'laugh-wink');
icons[counter++] = Array('fa-layer-group', 'layer-group');
icons[counter++] = Array('fa-leaf', 'leaf');
icons[counter++] = Array('fa-lemon', 'lemon');
icons[counter++] = Array('fa-less-than', 'less-than');
icons[counter++] = Array('fa-less-than-equal', 'less-than-equal');
icons[counter++] = Array('fa-level-down-alt', 'level-down-alt');
icons[counter++] = Array('fa-level-up-alt', 'level-up-alt');
icons[counter++] = Array('fa-life-ring', 'life-ring');
icons[counter++] = Array('fa-lightbulb', 'lightbulb');
icons[counter++] = Array('fa-link', 'link');
icons[counter++] = Array('fa-lira-sign', 'lira-sign');
icons[counter++] = Array('fa-list', 'list');
icons[counter++] = Array('fa-list-alt', 'list-alt');
icons[counter++] = Array('fa-list-ol', 'list-ol');
icons[counter++] = Array('fa-list-ul', 'list-ul');
icons[counter++] = Array('fa-location-arrow', 'location-arrow');
icons[counter++] = Array('fa-lock', 'lock');
icons[counter++] = Array('fa-lock-open', 'lock-open');
icons[counter++] = Array('fa-long-arrow-alt-down', 'long-arrow-alt-down');
icons[counter++] = Array('fa-long-arrow-alt-left', 'long-arrow-alt-left');
icons[counter++] = Array('fa-long-arrow-alt-right', 'long-arrow-alt-right');
icons[counter++] = Array('fa-long-arrow-alt-up', 'long-arrow-alt-up');
icons[counter++] = Array('fa-low-vision', 'low-vision');
icons[counter++] = Array('fa-luggage-cart', 'luggage-cart');
icons[counter++] = Array('fa-lungs', 'lungs');
icons[counter++] = Array('fa-lungs-virus', 'lungs-virus');
icons[counter++] = Array('fa-magic', 'magic');
icons[counter++] = Array('fa-magnet', 'magnet');
icons[counter++] = Array('fa-mail-bulk', 'mail-bulk');
icons[counter++] = Array('fa-male', 'male');
icons[counter++] = Array('fa-map', 'map');
icons[counter++] = Array('fa-map-marked', 'map-marked');
icons[counter++] = Array('fa-map-marked-alt', 'map-marked-alt');
icons[counter++] = Array('fa-map-marker', 'map-marker');
icons[counter++] = Array('fa-map-marker-alt', 'map-marker-alt');
icons[counter++] = Array('fa-map-pin', 'map-pin');
icons[counter++] = Array('fa-map-signs', 'map-signs');
icons[counter++] = Array('fa-marker', 'marker');
icons[counter++] = Array('fa-mars', 'mars');
icons[counter++] = Array('fa-mars-double', 'mars-double');
icons[counter++] = Array('fa-mars-stroke', 'mars-stroke');
icons[counter++] = Array('fa-mars-stroke-h', 'mars-stroke-h');
icons[counter++] = Array('fa-mars-stroke-v', 'mars-stroke-v');
icons[counter++] = Array('fa-mask', 'mask');
icons[counter++] = Array('fa-medal', 'medal');
icons[counter++] = Array('fa-medkit', 'medkit');
icons[counter++] = Array('fa-meh', 'meh');
icons[counter++] = Array('fa-meh-blank', 'meh-blank');
icons[counter++] = Array('fa-meh-rolling-eyes', 'meh-rolling-eyes');
icons[counter++] = Array('fa-memory', 'memory');
icons[counter++] = Array('fa-menorah', 'menorah');
icons[counter++] = Array('fa-mercury', 'mercury');
icons[counter++] = Array('fa-meteor', 'meteor');
icons[counter++] = Array('fa-microchip', 'microchip');
icons[counter++] = Array('fa-microphone', 'microphone');
icons[counter++] = Array('fa-microphone-alt', 'microphone-alt');
icons[counter++] = Array('fa-microphone-alt-slash', 'microphone-alt-slash');
icons[counter++] = Array('fa-microphone-slash', 'microphone-slash');
icons[counter++] = Array('fa-microscope', 'microscope');
icons[counter++] = Array('fa-minus', 'minus');
icons[counter++] = Array('fa-minus-circle', 'minus-circle');
icons[counter++] = Array('fa-minus-square', 'minus-square');
icons[counter++] = Array('fa-mitten', 'mitten');
icons[counter++] = Array('fa-mobile', 'mobile');
icons[counter++] = Array('fa-mobile-alt', 'mobile-alt');
icons[counter++] = Array('fa-money-bill', 'money-bill');
icons[counter++] = Array('fa-money-bill-alt', 'money-bill-alt');
icons[counter++] = Array('fa-money-bill-wave', 'money-bill-wave');
icons[counter++] = Array('fa-money-bill-wave-alt', 'money-bill-wave-alt');
icons[counter++] = Array('fa-money-check', 'money-check');
icons[counter++] = Array('fa-money-check-alt', 'money-check-alt');
icons[counter++] = Array('fa-monument', 'monument');
icons[counter++] = Array('fa-moon', 'moon');
icons[counter++] = Array('fa-mortar-pestle', 'mortar-pestle');
icons[counter++] = Array('fa-mosque', 'mosque');
icons[counter++] = Array('fa-motorcycle', 'motorcycle');
icons[counter++] = Array('fa-mountain', 'mountain');
icons[counter++] = Array('fa-mouse', 'mouse');
icons[counter++] = Array('fa-mouse-pointer', 'mouse-pointer');
icons[counter++] = Array('fa-mug-hot', 'mug-hot');
icons[counter++] = Array('fa-music', 'music');
icons[counter++] = Array('fa-network-wired', 'network-wired');
icons[counter++] = Array('fa-neuter', 'neuter');
icons[counter++] = Array('fa-newspaper', 'newspaper');
icons[counter++] = Array('fa-not-equal', 'not-equal');
icons[counter++] = Array('fa-notes-medical', 'notes-medical');
icons[counter++] = Array('fa-object-group', 'object-group');
icons[counter++] = Array('fa-object-ungroup', 'object-ungroup');
icons[counter++] = Array('fa-oil-can', 'oil-can');
icons[counter++] = Array('fa-om', 'om');
icons[counter++] = Array('fa-otter', 'otter');
icons[counter++] = Array('fa-outdent', 'outdent');
icons[counter++] = Array('fa-pager', 'pager');
icons[counter++] = Array('fa-paint-brush', 'paint-brush');
icons[counter++] = Array('fa-paint-roller', 'paint-roller');
icons[counter++] = Array('fa-palette', 'palette');
icons[counter++] = Array('fa-pallet', 'pallet');
icons[counter++] = Array('fa-paper-plane', 'paper-plane');
icons[counter++] = Array('fa-paperclip', 'paperclip');
icons[counter++] = Array('fa-parachute-box', 'parachute-box');
icons[counter++] = Array('fa-paragraph', 'paragraph');
icons[counter++] = Array('fa-parking', 'parking');
icons[counter++] = Array('fa-passport', 'passport');
icons[counter++] = Array('fa-pastafarianism', 'pastafarianism');
icons[counter++] = Array('fa-paste', 'paste');
icons[counter++] = Array('fa-pause', 'pause');
icons[counter++] = Array('fa-pause-circle', 'pause-circle');
icons[counter++] = Array('fa-paw', 'paw');
icons[counter++] = Array('fa-peace', 'peace');
icons[counter++] = Array('fa-pen', 'pen');
icons[counter++] = Array('fa-pen-alt', 'pen-alt');
icons[counter++] = Array('fa-pen-fancy', 'pen-fancy');
icons[counter++] = Array('fa-pen-nib', 'pen-nib');
icons[counter++] = Array('fa-pen-square', 'pen-square');
icons[counter++] = Array('fa-pencil-alt', 'pencil-alt');
icons[counter++] = Array('fa-pencil-ruler', 'pencil-ruler');
icons[counter++] = Array('fa-people-arrows', 'people-arrows');
icons[counter++] = Array('fa-people-carry', 'people-carry');
icons[counter++] = Array('fa-pepper-hot', 'pepper-hot');
icons[counter++] = Array('fa-percent', 'percent');
icons[counter++] = Array('fa-percentage', 'percentage');
icons[counter++] = Array('fa-person-booth', 'person-booth');
icons[counter++] = Array('fa-phone', 'phone');
icons[counter++] = Array('fa-phone-alt', 'phone-alt');
icons[counter++] = Array('fa-phone-slash', 'phone-slash');
icons[counter++] = Array('fa-phone-square', 'phone-square');
icons[counter++] = Array('fa-phone-square-alt', 'phone-square-alt');
icons[counter++] = Array('fa-phone-volume', 'phone-volume');
icons[counter++] = Array('fa-photo-video', 'photo-video');
icons[counter++] = Array('fa-piggy-bank', 'piggy-bank');
icons[counter++] = Array('fa-pills', 'pills');
icons[counter++] = Array('fa-pizza-slice', 'pizza-slice');
icons[counter++] = Array('fa-place-of-worship', 'place-of-worship');
icons[counter++] = Array('fa-plane', 'plane');
icons[counter++] = Array('fa-plane-arrival', 'plane-arrival');
icons[counter++] = Array('fa-plane-departure', 'plane-departure');
icons[counter++] = Array('fa-plane-slash', 'plane-slash');
icons[counter++] = Array('fa-play', 'play');
icons[counter++] = Array('fa-play-circle', 'play-circle');
icons[counter++] = Array('fa-plug', 'plug');
icons[counter++] = Array('fa-plus', 'plus');
icons[counter++] = Array('fa-plus-circle', 'plus-circle');
icons[counter++] = Array('fa-plus-square', 'plus-square');
icons[counter++] = Array('fa-podcast', 'podcast');
icons[counter++] = Array('fa-poll', 'poll');
icons[counter++] = Array('fa-poll-h', 'poll-h');
icons[counter++] = Array('fa-poo', 'poo');
icons[counter++] = Array('fa-poo-storm', 'poo-storm');
icons[counter++] = Array('fa-poop', 'poop');
icons[counter++] = Array('fa-portrait', 'portrait');
icons[counter++] = Array('fa-pound-sign', 'pound-sign');
icons[counter++] = Array('fa-power-off', 'power-off');
icons[counter++] = Array('fa-pray', 'pray');
icons[counter++] = Array('fa-praying-hands', 'praying-hands');
icons[counter++] = Array('fa-prescription', 'prescription');
icons[counter++] = Array('fa-prescription-bottle', 'prescription-bottle');
icons[counter++] = Array('fa-prescription-bottle-alt', 'prescription-bottle-alt');
icons[counter++] = Array('fa-print', 'print');
icons[counter++] = Array('fa-procedures', 'procedures');
icons[counter++] = Array('fa-project-diagram', 'project-diagram');
icons[counter++] = Array('fa-pump-medical', 'pump-medical');
icons[counter++] = Array('fa-pump-soap', 'pump-soap');
icons[counter++] = Array('fa-puzzle-piece', 'puzzle-piece');
icons[counter++] = Array('fa-qrcode', 'qrcode');
icons[counter++] = Array('fa-question', 'question');
icons[counter++] = Array('fa-question-circle', 'question-circle');
icons[counter++] = Array('fa-quidditch', 'quidditch');
icons[counter++] = Array('fa-quote-left', 'quote-left');
icons[counter++] = Array('fa-quote-right', 'quote-right');
icons[counter++] = Array('fa-quran', 'quran');
icons[counter++] = Array('fa-radiation', 'radiation');
icons[counter++] = Array('fa-radiation-alt', 'radiation-alt');
icons[counter++] = Array('fa-rainbow', 'rainbow');
icons[counter++] = Array('fa-random', 'random');
icons[counter++] = Array('fa-receipt', 'receipt');
icons[counter++] = Array('fa-record-vinyl', 'record-vinyl');
icons[counter++] = Array('fa-recycle', 'recycle');
icons[counter++] = Array('fa-redo', 'redo');
icons[counter++] = Array('fa-redo-alt', 'redo-alt');
icons[counter++] = Array('fa-registered', 'registered');
icons[counter++] = Array('fa-remove-format', 'remove-format');
icons[counter++] = Array('fa-reply', 'reply');
icons[counter++] = Array('fa-reply-all', 'reply-all');
icons[counter++] = Array('fa-republican', 'republican');
icons[counter++] = Array('fa-restroom', 'restroom');
icons[counter++] = Array('fa-retweet', 'retweet');
icons[counter++] = Array('fa-ribbon', 'ribbon');
icons[counter++] = Array('fa-ring', 'ring');
icons[counter++] = Array('fa-road', 'road');
icons[counter++] = Array('fa-robot', 'robot');
icons[counter++] = Array('fa-rocket', 'rocket');
icons[counter++] = Array('fa-route', 'route');
icons[counter++] = Array('fa-rss', 'rss');
icons[counter++] = Array('fa-rss-square', 'rss-square');
icons[counter++] = Array('fa-ruble-sign', 'ruble-sign');
icons[counter++] = Array('fa-ruler', 'ruler');
icons[counter++] = Array('fa-ruler-combined', 'ruler-combined');
icons[counter++] = Array('fa-ruler-horizontal', 'ruler-horizontal');
icons[counter++] = Array('fa-ruler-vertical', 'ruler-vertical');
icons[counter++] = Array('fa-running', 'running');
icons[counter++] = Array('fa-rupee-sign', 'rupee-sign');
icons[counter++] = Array('fa-sad-cry', 'sad-cry');
icons[counter++] = Array('fa-sad-tear', 'sad-tear');
icons[counter++] = Array('fa-satellite', 'satellite');
icons[counter++] = Array('fa-satellite-dish', 'satellite-dish');
icons[counter++] = Array('fa-save', 'save');
icons[counter++] = Array('fa-school', 'school');
icons[counter++] = Array('fa-screwdriver', 'screwdriver');
icons[counter++] = Array('fa-scroll', 'scroll');
icons[counter++] = Array('fa-sd-card', 'sd-card');
icons[counter++] = Array('fa-search', 'search');
icons[counter++] = Array('fa-search-dollar', 'search-dollar');
icons[counter++] = Array('fa-search-location', 'search-location');
icons[counter++] = Array('fa-search-minus', 'search-minus');
icons[counter++] = Array('fa-search-plus', 'search-plus');
icons[counter++] = Array('fa-seedling', 'seedling');
icons[counter++] = Array('fa-server', 'server');
icons[counter++] = Array('fa-shapes', 'shapes');
icons[counter++] = Array('fa-share', 'share');
icons[counter++] = Array('fa-share-alt', 'share-alt');
icons[counter++] = Array('fa-share-alt-square', 'share-alt-square');
icons[counter++] = Array('fa-share-square', 'share-square');
icons[counter++] = Array('fa-shekel-sign', 'shekel-sign');
icons[counter++] = Array('fa-shield-alt', 'shield-alt');
icons[counter++] = Array('fa-shield-virus', 'shield-virus');
icons[counter++] = Array('fa-ship', 'ship');
icons[counter++] = Array('fa-shipping-fast', 'shipping-fast');
icons[counter++] = Array('fa-shoe-prints', 'shoe-prints');
icons[counter++] = Array('fa-shopping-bag', 'shopping-bag');
icons[counter++] = Array('fa-shopping-basket', 'shopping-basket');
icons[counter++] = Array('fa-shopping-cart', 'shopping-cart');
icons[counter++] = Array('fa-shower', 'shower');
icons[counter++] = Array('fa-shuttle-van', 'shuttle-van');
icons[counter++] = Array('fa-sign', 'sign');
icons[counter++] = Array('fa-sign-in-alt', 'sign-in-alt');
icons[counter++] = Array('fa-sign-language', 'sign-language');
icons[counter++] = Array('fa-sign-out-alt', 'sign-out-alt');
icons[counter++] = Array('fa-signal', 'signal');
icons[counter++] = Array('fa-signature', 'signature');
icons[counter++] = Array('fa-sim-card', 'sim-card');
icons[counter++] = Array('fa-sink', 'sink');
icons[counter++] = Array('fa-sitemap', 'sitemap');
icons[counter++] = Array('fa-skating', 'skating');
icons[counter++] = Array('fa-skiing', 'skiing');
icons[counter++] = Array('fa-skiing-nordic', 'skiing-nordic');
icons[counter++] = Array('fa-skull', 'skull');
icons[counter++] = Array('fa-skull-crossbones', 'skull-crossbones');
icons[counter++] = Array('fa-slash', 'slash');
icons[counter++] = Array('fa-sleigh', 'sleigh');
icons[counter++] = Array('fa-sliders-h', 'sliders-h');
icons[counter++] = Array('fa-smile', 'smile');
icons[counter++] = Array('fa-smile-beam', 'smile-beam');
icons[counter++] = Array('fa-smile-wink', 'smile-wink');
icons[counter++] = Array('fa-smog', 'smog');
icons[counter++] = Array('fa-smoking', 'smoking');
icons[counter++] = Array('fa-smoking-ban', 'smoking-ban');
icons[counter++] = Array('fa-sms', 'sms');
icons[counter++] = Array('fa-snowboarding', 'snowboarding');
icons[counter++] = Array('fa-snowflake', 'snowflake');
icons[counter++] = Array('fa-snowman', 'snowman');
icons[counter++] = Array('fa-snowplow', 'snowplow');
icons[counter++] = Array('fa-soap', 'soap');
icons[counter++] = Array('fa-socks', 'socks');
icons[counter++] = Array('fa-solar-panel', 'solar-panel');
icons[counter++] = Array('fa-sort', 'sort');
icons[counter++] = Array('fa-sort-alpha-down', 'sort-alpha-down');
icons[counter++] = Array('fa-sort-alpha-down-alt', 'sort-alpha-down-alt');
icons[counter++] = Array('fa-sort-alpha-up', 'sort-alpha-up');
icons[counter++] = Array('fa-sort-alpha-up-alt', 'sort-alpha-up-alt');
icons[counter++] = Array('fa-sort-amount-down', 'sort-amount-down');
icons[counter++] = Array('fa-sort-amount-down-alt', 'sort-amount-down-alt');
icons[counter++] = Array('fa-sort-amount-up', 'sort-amount-up');
icons[counter++] = Array('fa-sort-amount-up-alt', 'sort-amount-up-alt');
icons[counter++] = Array('fa-sort-down', 'sort-down');
icons[counter++] = Array('fa-sort-numeric-down', 'sort-numeric-down');
icons[counter++] = Array('fa-sort-numeric-down-alt', 'sort-numeric-down-alt');
icons[counter++] = Array('fa-sort-numeric-up', 'sort-numeric-up');
icons[counter++] = Array('fa-sort-numeric-up-alt', 'sort-numeric-up-alt');
icons[counter++] = Array('fa-sort-up', 'sort-up');
icons[counter++] = Array('fa-spa', 'spa');
icons[counter++] = Array('fa-space-shuttle', 'space-shuttle');
icons[counter++] = Array('fa-spell-check', 'spell-check');
icons[counter++] = Array('fa-spider', 'spider');
icons[counter++] = Array('fa-spinner', 'spinner');
icons[counter++] = Array('fa-splotch', 'splotch');
icons[counter++] = Array('fa-spray-can', 'spray-can');
icons[counter++] = Array('fa-square', 'square');
icons[counter++] = Array('fa-square-full', 'square-full');
icons[counter++] = Array('fa-square-root-alt', 'square-root-alt');
icons[counter++] = Array('fa-stamp', 'stamp');
icons[counter++] = Array('fa-star', 'star');
icons[counter++] = Array('fa-star-and-crescent', 'star-and-crescent');
icons[counter++] = Array('fa-star-half', 'star-half');
icons[counter++] = Array('fa-star-half-alt', 'star-half-alt');
icons[counter++] = Array('fa-star-of-david', 'star-of-david');
icons[counter++] = Array('fa-star-of-life', 'star-of-life');
icons[counter++] = Array('fa-step-backward', 'step-backward');
icons[counter++] = Array('fa-step-forward', 'step-forward');
icons[counter++] = Array('fa-stethoscope', 'stethoscope');
icons[counter++] = Array('fa-sticky-note', 'sticky-note');
icons[counter++] = Array('fa-stop', 'stop');
icons[counter++] = Array('fa-stop-circle', 'stop-circle');
icons[counter++] = Array('fa-stopwatch', 'stopwatch');
icons[counter++] = Array('fa-stopwatch-20', 'stopwatch-20');
icons[counter++] = Array('fa-store', 'store');
icons[counter++] = Array('fa-store-alt', 'store-alt');
icons[counter++] = Array('fa-store-alt-slash', 'store-alt-slash');
icons[counter++] = Array('fa-store-slash', 'store-slash');
icons[counter++] = Array('fa-stream', 'stream');
icons[counter++] = Array('fa-street-view', 'street-view');
icons[counter++] = Array('fa-strikethrough', 'strikethrough');
icons[counter++] = Array('fa-stroopwafel', 'stroopwafel');
icons[counter++] = Array('fa-subscript', 'subscript');
icons[counter++] = Array('fa-subway', 'subway');
icons[counter++] = Array('fa-suitcase', 'suitcase');
icons[counter++] = Array('fa-suitcase-rolling', 'suitcase-rolling');
icons[counter++] = Array('fa-sun', 'sun');
icons[counter++] = Array('fa-superscript', 'superscript');
icons[counter++] = Array('fa-surprise', 'surprise');
icons[counter++] = Array('fa-swatchbook', 'swatchbook');
icons[counter++] = Array('fa-swimmer', 'swimmer');
icons[counter++] = Array('fa-swimming-pool', 'swimming-pool');
icons[counter++] = Array('fa-synagogue', 'synagogue');
icons[counter++] = Array('fa-sync', 'sync');
icons[counter++] = Array('fa-sync-alt', 'sync-alt');
icons[counter++] = Array('fa-syringe', 'syringe');
icons[counter++] = Array('fa-table', 'table');
icons[counter++] = Array('fa-table-tennis', 'table-tennis');
icons[counter++] = Array('fa-tablet', 'tablet');
icons[counter++] = Array('fa-tablet-alt', 'tablet-alt');
icons[counter++] = Array('fa-tablets', 'tablets');
icons[counter++] = Array('fa-tachometer-alt', 'tachometer-alt');
icons[counter++] = Array('fa-tag', 'tag');
icons[counter++] = Array('fa-tags', 'tags');
icons[counter++] = Array('fa-tape', 'tape');
icons[counter++] = Array('fa-tasks', 'tasks');
icons[counter++] = Array('fa-taxi', 'taxi');
icons[counter++] = Array('fa-teeth', 'teeth');
icons[counter++] = Array('fa-teeth-open', 'teeth-open');
icons[counter++] = Array('fa-temperature-high', 'temperature-high');
icons[counter++] = Array('fa-temperature-low', 'temperature-low');
icons[counter++] = Array('fa-tenge', 'tenge');
icons[counter++] = Array('fa-terminal', 'terminal');
icons[counter++] = Array('fa-text-height', 'text-height');
icons[counter++] = Array('fa-text-width', 'text-width');
icons[counter++] = Array('fa-th', 'th');
icons[counter++] = Array('fa-th-large', 'th-large');
icons[counter++] = Array('fa-th-list', 'th-list');
icons[counter++] = Array('fa-theater-masks', 'theater-masks');
icons[counter++] = Array('fa-thermometer', 'thermometer');
icons[counter++] = Array('fa-thermometer-empty', 'thermometer-empty');
icons[counter++] = Array('fa-thermometer-full', 'thermometer-full');
icons[counter++] = Array('fa-thermometer-half', 'thermometer-half');
icons[counter++] = Array('fa-thermometer-quarter', 'thermometer-quarter');
icons[counter++] = Array('fa-thermometer-three-quarters', 'thermometer-three-quarters');
icons[counter++] = Array('fa-thumbs-down', 'thumbs-down');
icons[counter++] = Array('fa-thumbs-up', 'thumbs-up');
icons[counter++] = Array('fa-thumbtack', 'thumbtack');
icons[counter++] = Array('fa-ticket-alt', 'ticket-alt');
icons[counter++] = Array('fa-times', 'times');
icons[counter++] = Array('fa-times-circle', 'times-circle');
icons[counter++] = Array('fa-tint', 'tint');
icons[counter++] = Array('fa-tint-slash', 'tint-slash');
icons[counter++] = Array('fa-tired', 'tired');
icons[counter++] = Array('fa-toggle-off', 'toggle-off');
icons[counter++] = Array('fa-toggle-on', 'toggle-on');
icons[counter++] = Array('fa-toilet', 'toilet');
icons[counter++] = Array('fa-toilet-paper', 'toilet-paper');
icons[counter++] = Array('fa-toilet-paper-slash', 'toilet-paper-slash');
icons[counter++] = Array('fa-toolbox', 'toolbox');
icons[counter++] = Array('fa-tools', 'tools');
icons[counter++] = Array('fa-tooth', 'tooth');
icons[counter++] = Array('fa-torah', 'torah');
icons[counter++] = Array('fa-torii-gate', 'torii-gate');
icons[counter++] = Array('fa-tractor', 'tractor');
icons[counter++] = Array('fa-trademark', 'trademark');
icons[counter++] = Array('fa-traffic-light', 'traffic-light');
icons[counter++] = Array('fa-trailer', 'trailer');
icons[counter++] = Array('fa-train', 'train');
icons[counter++] = Array('fa-tram', 'tram');
icons[counter++] = Array('fa-transgender', 'transgender');
icons[counter++] = Array('fa-transgender-alt', 'transgender-alt');
icons[counter++] = Array('fa-trash', 'trash');
icons[counter++] = Array('fa-trash-alt', 'trash-alt');
icons[counter++] = Array('fa-trash-restore', 'trash-restore');
icons[counter++] = Array('fa-trash-restore-alt', 'trash-restore-alt');
icons[counter++] = Array('fa-tree', 'tree');
icons[counter++] = Array('fa-trophy', 'trophy');
icons[counter++] = Array('fa-truck', 'truck');
icons[counter++] = Array('fa-truck-loading', 'truck-loading');
icons[counter++] = Array('fa-truck-monster', 'truck-monster');
icons[counter++] = Array('fa-truck-moving', 'truck-moving');
icons[counter++] = Array('fa-truck-pickup', 'truck-pickup');
icons[counter++] = Array('fa-tshirt', 'tshirt');
icons[counter++] = Array('fa-tty', 'tty');
icons[counter++] = Array('fa-tv', 'tv');
icons[counter++] = Array('fa-umbrella', 'umbrella');
icons[counter++] = Array('fa-umbrella-beach', 'umbrella-beach');
icons[counter++] = Array('fa-underline', 'underline');
icons[counter++] = Array('fa-undo', 'undo');
icons[counter++] = Array('fa-undo-alt', 'undo-alt');
icons[counter++] = Array('fa-universal-access', 'universal-access');
icons[counter++] = Array('fa-university', 'university');
icons[counter++] = Array('fa-unlink', 'unlink');
icons[counter++] = Array('fa-unlock', 'unlock');
icons[counter++] = Array('fa-unlock-alt', 'unlock-alt');
icons[counter++] = Array('fa-upload', 'upload');
icons[counter++] = Array('fa-user', 'user');
icons[counter++] = Array('fa-user-alt', 'user-alt');
icons[counter++] = Array('fa-user-alt-slash', 'user-alt-slash');
icons[counter++] = Array('fa-user-astronaut', 'user-astronaut');
icons[counter++] = Array('fa-user-check', 'user-check');
icons[counter++] = Array('fa-user-circle', 'user-circle');
icons[counter++] = Array('fa-user-clock', 'user-clock');
icons[counter++] = Array('fa-user-cog', 'user-cog');
icons[counter++] = Array('fa-user-edit', 'user-edit');
icons[counter++] = Array('fa-user-friends', 'user-friends');
icons[counter++] = Array('fa-user-graduate', 'user-graduate');
icons[counter++] = Array('fa-user-injured', 'user-injured');
icons[counter++] = Array('fa-user-lock', 'user-lock');
icons[counter++] = Array('fa-user-md', 'user-md');
icons[counter++] = Array('fa-user-minus', 'user-minus');
icons[counter++] = Array('fa-user-ninja', 'user-ninja');
icons[counter++] = Array('fa-user-nurse', 'user-nurse');
icons[counter++] = Array('fa-user-plus', 'user-plus');
icons[counter++] = Array('fa-user-secret', 'user-secret');
icons[counter++] = Array('fa-user-shield', 'user-shield');
icons[counter++] = Array('fa-user-slash', 'user-slash');
icons[counter++] = Array('fa-user-tag', 'user-tag');
icons[counter++] = Array('fa-user-tie', 'user-tie');
icons[counter++] = Array('fa-user-times', 'user-times');
icons[counter++] = Array('fa-users', 'users');
icons[counter++] = Array('fa-users-cog', 'users-cog');
icons[counter++] = Array('fa-users-slash', 'users-slash');
icons[counter++] = Array('fa-utensil-spoon', 'utensil-spoon');
icons[counter++] = Array('fa-utensils', 'utensils');
icons[counter++] = Array('fa-vector-square', 'vector-square');
icons[counter++] = Array('fa-venus', 'venus');
icons[counter++] = Array('fa-venus-double', 'venus-double');
icons[counter++] = Array('fa-venus-mars', 'venus-mars');
icons[counter++] = Array('fa-vest', 'vest');
icons[counter++] = Array('fa-vest-patches', 'vest-patches');
icons[counter++] = Array('fa-vial', 'vial');
icons[counter++] = Array('fa-vials', 'vials');
icons[counter++] = Array('fa-video', 'video');
icons[counter++] = Array('fa-video-slash', 'video-slash');
icons[counter++] = Array('fa-vihara', 'vihara');
icons[counter++] = Array('fa-virus', 'virus');
icons[counter++] = Array('fa-virus-slash', 'virus-slash');
icons[counter++] = Array('fa-viruses', 'viruses');
icons[counter++] = Array('fa-voicemail', 'voicemail');
icons[counter++] = Array('fa-volleyball-ball', 'volleyball-ball');
icons[counter++] = Array('fa-volume-down', 'volume-down');
icons[counter++] = Array('fa-volume-mute', 'volume-mute');
icons[counter++] = Array('fa-volume-off', 'volume-off');
icons[counter++] = Array('fa-volume-up', 'volume-up');
icons[counter++] = Array('fa-vote-yea', 'vote-yea');
icons[counter++] = Array('fa-vr-cardboard', 'vr-cardboard');
icons[counter++] = Array('fa-walking', 'walking');
icons[counter++] = Array('fa-wallet', 'wallet');
icons[counter++] = Array('fa-warehouse', 'warehouse');
icons[counter++] = Array('fa-water', 'water');
icons[counter++] = Array('fa-wave-square', 'wave-square');
icons[counter++] = Array('fa-weight', 'weight');
icons[counter++] = Array('fa-weight-hanging', 'weight-hanging');
icons[counter++] = Array('fa-wheelchair', 'wheelchair');
icons[counter++] = Array('fa-wifi', 'wifi');
icons[counter++] = Array('fa-wind', 'wind');
icons[counter++] = Array('fa-window-close', 'window-close');
icons[counter++] = Array('fa-window-maximize', 'window-maximize');
icons[counter++] = Array('fa-window-minimize', 'window-minimize');
icons[counter++] = Array('fa-window-restore', 'window-restore');
icons[counter++] = Array('fa-wine-bottle', 'wine-bottle');
icons[counter++] = Array('fa-wine-glass', 'wine-glass');
icons[counter++] = Array('fa-wine-glass-alt', 'wine-glass-alt');
icons[counter++] = Array('fa-won-sign', 'won-sign');
icons[counter++] = Array('fa-wrench', 'wrench');
icons[counter++] = Array('fa-x-ray', 'x-ray');
icons[counter++] = Array('fa-yen-sign', 'yen-sign');
icons[counter++] = Array('fa-yin-yang', 'yin-yang');

var fontawesomeIcons = null;

function getFontawesomeIcons() {
    if (fontawesomeIcons != null) return fontawesomeIcons;

    icons.sort();
    fontawesomeIcons = "";
    for (var i = 0; i < icons.length; i++) {
        var newTitle = '';
        var ctr = 0;
        var title = icons[i][1];
        title = title.split(' ');
        for (var x = 0; x < title.length; x++) {
            ctr++;
            newTitle += ctr == 3 ? '<br />' : '';
            newTitle += title[x] + ' ';
            ctr = ctr == 3 ? 0 : ctr;
        }
        fontawesomeIcons += '<a href="#" onclick="klik(this);return false;" title="fa ' + icons[i][0] + ' ' + icons[i][1] + '"><span class="fa fas fa-solid ' + icons[i][0] + '"></span><div>' + newTitle + '</div></a>';
    };
    return fontawesomeIcons;
}

function klik(el) {
    //console.log("Klik, id=", getDialogId());
    document.getElementsByClassName('fontawesomeClass'+getDialogId())[0].getElementsByTagName('input')[0].value = el.getAttribute('title');
    a = document.getElementById('fontawesome'+getDialogId());
    a = a.getElementsByTagName('a');
    for (i = 0; i < a.length; i++) {
        a[i].className = '';
    }
    el.className += 'active';
};

function searchIcon(val) {
    var aydi = document.getElementById('fontawesome'+getDialogId());
    var klases = aydi.getElementsByTagName('a');
    val = val.toLowerCase();
    for (var i = 0, len = klases.length, klas, klasNeym; i < len; i++) {
        klas = klases[i];
        klasNeym = klas.getAttribute('title');

        if (klasNeym && klasNeym.toLowerCase().indexOf(val) >= 0) {
            klas.style.display = 'block';
        } else {
            klas.style.display = 'none';
        }
    }
};

function setSpanColor(color) {
    el = document.getElementById('fontawesome'+getDialogId());
    el = el.getElementsByTagName('span');
    for (i = 0; i < el.length; i++) {
        el[i].setAttribute('style', 'color:' + color)
    }
};

function setCheckboxes() {
    klases = '';
    klases += document.getElementsByClassName('spinning'+getDialogId())[0].getElementsByTagName('input')[0].checked ? ' fa-spin' : klases;
    klases += document.getElementsByClassName('fixedWidth'+getDialogId())[0].getElementsByTagName('input')[0].checked ? ' fa-fw' : klases;
    klases += document.getElementsByClassName('bordered'+getDialogId())[0].getElementsByTagName('input')[0].checked ? ' fa-border' : klases;
    klases += ' ' + document.getElementsByClassName('flippedRotation'+getDialogId())[0].getElementsByTagName('select')[0].value;
    el = document.getElementById('fontawesome'+getDialogId());
    el = el.getElementsByTagName('span');
    for (i = 0; i < el.length; i++) {
        el[i].className = el[i].parentNode.getAttribute('title') + klases;
    }
};

function in_array(needle, haystack) {
    for (var i in haystack) {
        if (haystack[i] == needle) return true;
    }
    return false;
};

function getDialogId() {
    return "-"+ckEditorInstance.name;
}

CKEDITOR.dialog.add('fontawesomeDialog', function(editor) {

    //console.log("Adding FA dialog, editor=", editor);
    var dialogId = "-"+editor.name;

    //try to add custom icons
    var customIcons = editor.config.fontAwesomeCustomIcons;
    if (typeof customIcons != 'undefined' && customIcons != null && customIcons.length > 0) {
        //custom icons are in format icon:text on new lines
        customIcons = customIcons.split('\n');
        for (var i = 0; i < customIcons.length; i++) {
            var pair = customIcons[i].split(':');
            if (pair.length==2) icons[counter++] = Array(pair[0], pair[1]);
        }
    }

    return {
        title: 'Font Awesome',
        minWidth: 600,
        minHeight: 400,
        resizable: false,
        contents: [{
            id: 'insertFontawesome',
            label: 'insertFontawesome',
            elements: [{
                type: 'hbox',
                widths: ['50%', '50%'],
                children: [{
                    type: 'hbox',
                    widths: ['75%', '25%'],
                    children: [{
                        type: 'text',
                        id: 'colorChooser',
                        className: 'colorChooser'+dialogId,
                        label: editor.lang.fontawesome.color,
                        onKeyUp: function(e) {
                            setSpanColor(e.sender.$.value);
                        },
                        setup: function(widget) {
                            color = widget.data.color != '' ? widget.data.color : '';
                            this.setValue(color);
                            setSpanColor(color);
                        },
                        commit: function(widget) {
                            widget.setData('color', this.getValue());
                        }
                    }, {
                        type: 'button',
                        label: editor.lang.fontawesome.select,
                        style: 'margin-top:1.35em',
                        onClick: function() {
                            editor.getColorFromDialog(function(color) {
                                document.getElementsByClassName('colorChooser'+dialogId)[0].getElementsByTagName('input')[0].value = color;
                                setSpanColor(color);
                            }, this);
                        }
                    }]
                }, {
                    type: 'text',
                    id: 'size',
                    className: 'size',
                    label: editor.lang.fontawesome.size,
                    setup: function(widget) {
                        this.setValue(widget.data.size);
                    },
                    commit: function(widget) {
                        widget.setData('size', this.getValue());
                    }
                }]
            }, {
                type: 'hbox',
                widths: ['25%', '25%', '25%', '25%'],
                children: [{
                    type: 'checkbox',
                    id: 'spinning',
                    className: 'spinning'+dialogId+' cke_dialog_ui_checkbox_input',
                    label: editor.lang.fontawesome.spinning,
                    value: 'true',
                    setup: function(widget) {
                        var klases = widget.data.classes;
                        klases = klases.split(' ');
                        document.getElementsByClassName('spinning'+dialogId)[0].getElementsByTagName('input')[0].checked = in_array('fa-spin', klases) ? true : false;
                        setCheckboxes();
                    },
                    onClick: function() {
                        setCheckboxes();
                    }
                }, {
                    type: 'checkbox',
                    id: 'fixedWidth',
                    className: 'fixedWidth'+dialogId+' cke_dialog_ui_checkbox_input',
                    label: editor.lang.fontawesome.fixedWidth,
                    value: 'true',
                    setup: function(widget) {
                        var klases = widget.data.classes;
                        klases = klases.split(' ');
                        document.getElementsByClassName('fixedWidth'+dialogId)[0].getElementsByTagName('input')[0].checked = in_array('fa-fw', klases) ? true : false;
                        setCheckboxes();
                    },
                    onClick: function() {
                        setCheckboxes();
                    }
                }, {
                    type: 'checkbox',
                    id: 'bordered',
                    className: 'bordered'+dialogId+' cke_dialog_ui_checkbox_input',
                    label: editor.lang.fontawesome.bordered,
                    value: 'true',
                    setup: function(widget) {
                        var klases = widget.data.classes;
                        klases = klases.split(' ');
                        document.getElementsByClassName('bordered'+dialogId)[0].getElementsByTagName('input')[0].checked = in_array('fa-border', klases) ? true : false;
                        setCheckboxes();
                    },
                    onClick: function() {
                        setCheckboxes();
                    }
                }, {
                    type: 'select',
                    id: 'flippedRotation',
                    className: 'flippedRotation'+dialogId+' cke_dialog_ui_checkbox_input',
                    label: editor.lang.fontawesome.flippingAndRotating,
                    items: [
                        [editor.lang.fontawesome.normal, ''],
                        [editor.lang.fontawesome.rotate90, 'fa-rotate-90'],
                        [editor.lang.fontawesome.rotate180, 'fa-rotate-180'],
                        [editor.lang.fontawesome.rotate270, 'fa-rotate-270'],
                        [editor.lang.fontawesome.flipHorizontal, 'fa-flip-horizontal'],
                        [editor.lang.fontawesome.flipVertical, 'fa-flip-vertical']
                    ],
                    setup: function(widget) {
                        this.setValue(widget.data.flippedRotation ? widget.data.flippedRotation : '');
                    },
                    commit: function(widget) {
                        widget.setData('flippedRotation', this.getValue());
                    },
                    onClick: function() {
                        setCheckboxes();
                    }
                }]
            }, {
                type: 'text',
                id: 'fontawesomeSearch',
                className: 'fontawesomeSearch cke_dialog_ui_input_text',
                label: editor.lang.fontawesome.search,
                onKeyUp: function(e) {
                    searchIcon(e.sender.$.value);
                }
            }, {
                type: 'text',
                id: 'fontawesomeClass',
                className: 'fontawesomeClass'+dialogId,
                style: 'display:none',
                setup: function(widget) {
                    var klases = '';
                    if (widget.data.classes != '') {
                        klases = widget.data.classes;
                        klases = klases.split(' ');
                        in_array('fa-border', klases) ? klases.splice(klases.indexOf('fa-border'), 1) : '';
                        in_array('fa-fw', klases) ? klases.splice(klases.indexOf('fa-fw'), 1) : '';
                        in_array('fa-spin', klases) ? klases.splice(klases.indexOf('fa-spin'), 1) : '';
                        in_array('fa-rotate-90', klases) ? klases.splice(klases.indexOf('fa-rotate-90'), 1) : '';
                        in_array('fa-rotate-180', klases) ? klases.splice(klases.indexOf('fa-rotate-180'), 1) : '';
                        in_array('fa-rotate-270', klases) ? klases.splice(klases.indexOf('fa-rotate-270'), 1) : '';
                        in_array('fa-flip-horizontal', klases) ? klases.splice(klases.indexOf('fa-flip-horizontal'), 1) : '';
                        in_array('fa-flip-vertical', klases) ? klases.splice(klases.indexOf('fa-flip-vertical'), 1) : '';
                        klases = klases.join(' ');
                    }
                    this.setValue(klases);
                },
                commit: function(widget) {
                    var klases = '';
                    klases += document.getElementsByClassName('spinning'+dialogId)[0].getElementsByTagName('input')[0].checked ? ' fa-spin' : '';
                    klases += document.getElementsByClassName('fixedWidth'+dialogId)[0].getElementsByTagName('input')[0].checked ? ' fa-fw' : '';
                    klases += document.getElementsByClassName('bordered'+dialogId)[0].getElementsByTagName('input')[0].checked ? ' fa-border' : '';
                    klases += ' ' + document.getElementsByClassName('flippedRotation'+dialogId)[0].getElementsByTagName('select')[0].value;
                    if (this.getValue().indexOf("cke_widget_element")==-1) klases += ' cke_widget_element';
                    //console.log("Setting classes=", klases, "value=", this.getValue())
                    widget.setData('classes', this.getValue() + klases);
                }
            }, {
                type: 'html',
                html: '<div id="fontawesome'+dialogId+'" class="fontawesomeIconsSelector">' + getFontawesomeIcons() + '</div>'
            }]
        }],
        onOk: function() {
            glyphs = document.getElementById('fontawesome'+dialogId);
            glyphs = glyphs.getElementsByTagName('a');
            for (i = 0; i < glyphs.length; i++) {
                glyphs[i].firstChild.className = glyphs[i].getAttribute('title');
                glyphs[i].className = '';
                glyphs[i].style.display = '';
                glyphs[i].getElementsByTagName('span')[0].style.color = '';
            }
        }
    }
});