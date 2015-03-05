/**
 * This snippets get all image elements, select their
 * parent nodes if they are an 'a' and adds a zero border to it
 */
for ( var i = 0; i < document.querySelectorAll( 'a img' ).length; i++ ) {
  if ( document.querySelectorAll( 'a img' )[i].parentNode.tagName == 'A' )
    document.querySelectorAll( 'a img' )[i].parentNode.style.border = '0';
}