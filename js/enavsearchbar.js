function searchBarModule(enableAdvancedSearch) {
    var numberOfAdvBars = document.getElementsByClassName('header__searchbar').length;
    for (var i = 0; i < numberOfAdvBars; i++) {
        (function() {
            var ImageButton = document.getElementsByClassName('search-button')[i];
            var TextBoxInput = document.getElementsByClassName('search-textbox')[i];
            var DropDownList = document.getElementsByClassName('search-product-categories')[i];

            if (enableAdvancedSearch === 'true') {
                var RohsBox = document.getElementsByClassName('search-rohs-box')[i].children[0];
                var NonRohsBox = document.getElementsByClassName('search-non-rohs-box')[i].children[0];
                var InstockBox = document.getElementsByClassName('search-in-stock-box')[i].children[0];
                var NormalStockBox = document.getElementsByClassName('search-normal-stock-box')[i].children[0];
                var NewProdBox = document.getElementsByClassName('search-new-prod-box')[i].children[0];
                var DatasheetBox = document.getElementsByClassName('search-datasheet-box')[i].children[0];
                var PhotoBox = document.getElementsByClassName('search-photo-box')[i].children[0];
                var CadBox = document.getElementsByClassName('search-cad-box')[i].children[0];
                var Searchbox = document.getElementsByClassName('header__searchbar')[i];
                var Advanced = document.getElementsByClassName('searchbox-inner-searchtext')[i].children[1];
                var CloseAdvanced = document.getElementsByClassName('searchbox-inner-title')[i].children[0];
                var OverlayDiv = document.getElementsByClassName('searchbox-mask')[i];
            }

            if (typeof window.searchOptions !== "undefined") {
                var searchOptionsLength = window.searchOptions.length;
                for (var j = 0; j < searchOptionsLength; j++) {
                    var option = document.createElement("option");
                    option.text = window.searchOptions[j].Text;
                    option.value = window.searchOptions[j].Value;
                    if (window.searchOptions[j].IsSelected) {
                        option.selected = true;
                    }
                    option.setAttribute("data-name", window.searchOptions[j].DataName);
                    DropDownList.appendChild(option);
                }
            }

            function doHpSearch(e) {
                e.preventDefault();
                var SelectedValue = DropDownList.options[DropDownList.selectedIndex].value;
                SelectedValue = SelectedValue.replace('{0}', encodeURIComponent(TextBoxInput.value));

                // Add utag value to get picked up on Firefox
                if (typeof window.utag !== "undefined" && typeof window.utag.dkCookie !== "undefined") {
                    utag.dkCookie("ref_page_event=Initiate Search");
                }

                if (enableAdvancedSearch === 'true') {
                    if (RohsBox.checked) {
                        SelectedValue = SelectedValue + '&rohs=1';
                    }
                    if (NonRohsBox.checked) {
                        SelectedValue = SelectedValue + '&nonrohs=1';
                    }
                    if (InstockBox.checked) {
                        SelectedValue = SelectedValue + '&stock=1';
                    }
                    if (NormalStockBox.checked) {
                        SelectedValue = SelectedValue + '&nstock=1';
                    }
                    if (NewProdBox.checked) {
                        SelectedValue = SelectedValue + '&newproducts=1';
                    }
                    if (DatasheetBox.checked) {
                        SelectedValue = SelectedValue + '&datasheet=1';
                    }
                    if (PhotoBox.checked) {
                        SelectedValue = SelectedValue + '&photo=1';
                    }
                    if (CadBox.checked) {
                        SelectedValue = SelectedValue + '&cad=1';
                    }
                }
                
                window.location.href = window.location.protocol + '//' + window.location.hostname + SelectedValue;
            }
            function keypressDoHpSearch(e) {
                if (e.keyCode === 13) {
                    doHpSearch(e);
                }
            }
            function rohsCheck(e) {
                if (RohsBox.checked) {
                    NonRohsBox.disabled = true;
                } else {
                    NonRohsBox.disabled = false;
                }
            }
            function nonRohsCheck(e) {
                if (NonRohsBox.checked) {
                    RohsBox.disabled = true;
                } else {
                    RohsBox.disabled = false;
                }
            }
            function showAdvanced() {
                Searchbox.className += ' show-advanced';
                for (var j = 0; j < numberOfAdvBars; j++) {
                    document.getElementsByClassName('searchbox-inner-categories')[j].style.display = "none";
                }
            }
            function hideAdvanced() {
                for (var j = 0; j < numberOfAdvBars; j++) {
                    var AllProductsValue = document.getElementsByClassName('searchbox-inner-categories')[j].children[0].children[0].value;
                    document.getElementsByClassName('searchbox-inner-categories')[j].children[0].value = AllProductsValue;
                    document.getElementsByClassName('searchbox-inner-categories')[j].style.display = "table-cell";
                    Searchbox.className = Searchbox.className.replace('show-advanced', '')
                    var collection = document.getElementsByClassName('searchbox-inner-wrapper')[j].getElementsByTagName('INPUT');
                    for (var x = 0; x < collection.length; x++) {
                        if (collection[x].type.toUpperCase() == 'CHECKBOX')
                            collection[x].checked = false;
                    }
                    RohsBox.disabled = false;
                    NonRohsBox.disabled = false;
                }
            }
            ImageButton.addEventListener('click', doHpSearch, false);
            TextBoxInput.addEventListener('keydown', keypressDoHpSearch, false);

            if (enableAdvancedSearch === 'true') {
                RohsBox.addEventListener('click', rohsCheck, false);
                NonRohsBox.addEventListener('click', nonRohsCheck, false);
                Advanced.addEventListener('click', showAdvanced, false);
                CloseAdvanced.addEventListener('click', hideAdvanced, false)
                OverlayDiv.addEventListener('click', hideAdvanced, false)
            }
        }());
    }
}
;