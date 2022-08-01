$("#searchBox").keypress(
    _.debounce(
              function()
              {
                search($("#searchBox").val());
              },400)
)


function search(value)
{ 
  $('#filter-activity option').remove();
  $('#filter-organisms option').remove();
  query = value.toUpperCase()
  if(value.length > 3)
  {
    if(query.startsWith('TARGET'))
    {	
		if (query.length > 6)
		{ 
			let range = query.substring(6).split('-');
			let tarIds = [];
			for( let i=parseInt(range[0]); i<= parseInt(range[range.length - 1]); i++)
			{	tarIds.push(i); }
			renderCards(tarIds);
		}
	}
    else
    {
	  query = new RegExp ("^" + query + "| " + query + ".* | " + query + "[^ ]*$","i");
      //query = new RegExp (" " + query + "|" + query + " | " + query + " |^" + query,"i");
      ACTIVITY_TO_TARID = JSON.parse(activity);
      ORGANISM_TO_TARID = JSON.parse(organisms);
      ids = [];
      
      let keys = Object.keys(ACTIVITY_TO_TARID).filter((key) => query.test(key));
      for (let i=0;i<keys.length; i++)
      { ids = ids.concat(ACTIVITY_TO_TARID[keys[i]]); }
      //queryToCard(ids);
		
      keys = Object.keys(ORGANISM_TO_TARID).filter((key) => key.match(query));  
	  for (let i=0; i < keys.length; i++)
      {  ids = ids.concat(ORGANISM_TO_TARID[keys[i]]); }
      //queryToCard(ids);
		
      keys = Object.keys(TARID_SET).filter((key) => TARID_SET[key]['name'].match(query));  
	  for (let i=0; i < keys.length; i++)
      {  ids = ids.concat(keys[i]); }
      //queryToCard(ids);
		
	if(ids.length > 0)
	{ renderCards([...new Set(ids)]); }
	
	else
	{ queryToCard(false);}
	
    }
  }
}
