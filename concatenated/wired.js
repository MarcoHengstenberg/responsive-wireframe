/**
 * This snippets get all image elements, select their
 * parent nodes if they are an 'a' and adds a zero border to it
 */
for ( var i = 0; i < document.querySelectorAll( 'a img' ).length; i++ ) {
  if ( document.querySelectorAll( 'a img' )[i].parentNode.tagName == 'A' )
    document.querySelectorAll( 'a img' )[i].parentNode.style.border = '0';
};function check(input) {
  if (input.value != document.getElementById('pw').value) {
    input.setCustomValidity('The two passwords must match.');
  }

  else {
    // input is valid -- reset the error message
    input.setCustomValidity('');
  }
}