var $overlay = $('#overlay'),
        origin;

$('#content').hide();
$overlay.hide();

// on close
$overlay.on('click', function onClose() {
  setTimeout(function(){

    $overlay.find('.selected-img').css({

      left:origin.left,
      top:origin.top,
      height: origin.height,
      width: origin.width

    });

    origin = null;

  }, 200);

  $('#content').fadeOut('fast');

  setTimeout(function(){

    // remove the blur filter
    $('#container').css('-webkit-filter', 'none');

    $overlay.fadeOut('fast').find('.selected-img').remove();

  }, 850);

});


// on open
$('#container').on('click', '.title', function onOpen() {

  var $el = $(this),
      clone = $el.clone(),
      id = $el.data('id'),
      article = articleData[id];

  var pos = $el.offset();

  // store info about when the tile belongs so it can be replaced on close
  origin = {
    left: pos.left,
    top: pos.top,
    height: $el.outerHeight(),
    width: $el.outerWidth()
  };

  // make the clone appear in the same place as the origin tile
  clone.addClass('selected-img').css({left:origin.left, top:origin.top, height: origin.height, width: origin.width});

  $overlay.show();

  // apply the blur & saturate filters
  $('#container').css('-webkit-filter', 'blur(10px) saturate(0.35)');

  var topMarginPercent = 12;
  var overlayWidth = $overlay.width();
  var availableWidth = (overlayWidth / 2);
  var availableHeight = $overlay.height();
  // minus the top margin
  availableHeight = availableHeight - (availableHeight * (topMarginPercent / 100)) - 25;
  var aspectRatio = origin.width / origin.height;
  var likelyHeight = availableWidth / aspectRatio;
  var likelyWidth = availableWidth;
  var isPortrait = likelyHeight > availableHeight;

  if (isPortrait) {
    likelyWidth = availableHeight * aspectRatio;
    likelyHeight = availableHeight;
  }

  var target = {
    top: topMarginPercent + '%',
    left: ((availableWidth - likelyWidth) / 2),
    width: likelyWidth,
    height: likelyHeight
  };

  clone.appendTo($overlay[0]);

  // animate the cloned image to its new position in the detail view.
  setTimeout( function() { clone.css({height: target.height  + 'px', width: target.width  + 'px', top: target.top, left: target.left  + 'px'}); }, 10);

  // set up a short wait to display the article detail view
  setTimeout(function(){
    $('#content').css({top: target.top, left : target.left + target.width + (overlayWidth * 0.007) + 'px'}).fadeIn('fast');
    clone.find('img').css({'box-shadow': '0px 0px 10px black'})
  }, 500);

  // populate the detail view with the article data
  $('#article-headline').text(article.header);
  $('#article-body').html('<p>' + article.body.join('</p><p>')+ '</p>');
});

// Dummy data for each article
var articleData = {
  tile0: {
    header: 'trachle',
    body: ['an exhausting effort, especially walking or working.'
        , 'an exhausted or bedraggled person.'
        , 'verb: to fatigue; tire; wear out.'
        , 'to bedraggle.']
  },
  tile1: {
    header: 'More London Free Fringe Festival at The Scoop ',
    body: ['Spitalfields Music Summer Festival'
        , 'Southbank Beach'
        , 'A Photographic Exhibition By Photographer John Kenny'
        , 'London - World Naked Bike Ride'
        , 'Secret City of London Treasure Hunt'
        , 'Canada Day London festival in Trafalgar Square! '
        , 'Canary Wharf Farmer\'s Market'
        , 'Buckingham Palace Summer Opening']
  },
  tile2: {
    header: 'London Southbank',
    body: ['Charles Dickens Museum'
        , 'Pollock’s Toy Museum'
        , 'Museum of Garden History'
        , 'Imperial War Museum'
        , 'Sherlock Holmes Museum'
        , 'Spitalfields Centre Museum of Immigration & Diversity'
        , 'Kensington and Holland Park'
        , 'Victoria Embankment Gardens'
        , 'London Pubs and Bars']
  },
  tile8: {
    header: 'Security alert over Huawei telecoms deal',
    body: ['Parliament’s intelligence and security committee ‘shocked’ that Whitehall officials failed to tell ministers about BT’s use of Chinese equipment'
        , 'Maria Miller holds out against arts funding cuts'
        , 'Owner of London estate agency Foxtons hires banks for IPO'
        , 'China’s Wanda nears deal for James Bond yachtmaker'
        , 'Splits in Labour after Ed Miliband pledges to cap benefits'
        , 'Sir Martin Sorrell follows Twitter trend with advertising venture'
        , 'Crown dependencies to sign up to convention fighting tax evasion'
        ]
  },
  tile9: {
    header: 'China’s Wanda nears deal for James Bond yachtmaker',
    body: ['Fate of embattled Dwell to be decided within days'
        , 'Grim outlook for UK law firms as growth rate halves'
        , 'Asos helps Primark make online debut with range of 20 garments'
        , 'Tax burden soars 65% for UK’s big retailers'
        , 'Centrica in shale gas stake talks with Cuadrilla'
        , 'Barclays crisis investor Sumitomo sells half its stake'
        , 'UK high streets to lose 5,000 shops in next five years']
  },
  tile10: {
    header: 'Web groups hit back at data access claims',
    body: ['Facebook hit by fears over long-term prospects',
        , 'EU Libor plan that ends era of self-regulation'
        , 'Virgin sues Network Rail over West Coast line'
        , 'Big Tobacco bets a packet on e-cigarettes'
        , 'Investors square off in battle over subprime mortgages'
        , 'Wanda plots M&A epic in Hollywood'
        , 'Read More...']
  }
};