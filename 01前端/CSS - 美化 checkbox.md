注意：css3 的用: checked 伪类选择器会去检查元素属性（`input[checked]`），而不是 dom 节点上的属性（
`<input checked="checked" />`）。所以要使用 jquery 的 prop 而非 attr 添加属性。  

jquery 建议：具有 true 和 false 两个属性的属性，如 checked, selected 或者 disabled 使用 prop()，其他的使用 attr()。

    <style>
    .k-checkbox {
    	padding-bottom: 5px;
    }
    .k-checkbox:last-child{
    	padding-bottom: 0;
    }
    .k-checkbox input[type=checkbox] {
    	display:none
    }
    .k-checkbox label {
    	display:inline-block;
    	cursor:pointer;
    	position:relative;
    	padding:0 0 0 32px;
    	margin:0;
    	font-size: 15px;
    	font-weight:300;
    	line-height:22px
    }
    .k-checkbox label:before {
    	box-sizing: content-box;
    	content:"";
    	display:inline-block;
    	width:20px;
    	height:20px;
    	border:#d6dadc 1px solid;
    	position:absolute;
    	left:0;
    	top:0;
    	background:#fff;
    	-webkit-border-radius:3px;
    	-moz-border-radius:3px;
    	border-radius:3px
    }
    .k-checkbox label:active:before,.k-checkbox label:focus:before {
    	border-color:#9e9e9e
    }
    .k-checkbox label:hover:after,
    .k-checkbox input[type=checkbox]:checked+label:after {
    	content:"";
    	display:block;
    	width:20px;
    	height:20px;
    	position:absolute;
    	left:1px;
    	top:1px;
    	background:#fff url(<?= base_url('views/img/user/check.png')?>) 0 0 no-repeat;
    	-webkit-border-radius:3px;
    	-moz-border-radius:3px;
    	border-radius:3px
    }
    .k-checkbox label:hover:after {
    	background-position:-41px -146px
    }
    .k-checkbox input[type=checkbox]:checked+label:after {
    	background-position:3px -146px
    }
    .k-checkbox input[type=checkbox]:checked+label:hover:before,
    .k-checkbox input[type=checkbox]:checked+label:active:before {
    	border-color:#00bcd4
    }
    .k-checkbox.ok label:before {
    	border-color:#8ac249
    }
    .k-checkbox.warning label:before {
    	border-color:#ff9800
    }
    .k-checkbox.error label:before {
    	border-color:#f44336
    }
    </style>
    <div class="k-checkbox">
      	<input type="checkbox" id="is-agree">
        <label onclick="$('#is-agree').prop('checked') ? $('#is-agree').prop('checked', false) : $('#is-agree').prop('checked', true);">我同意PHP是最好的编程语言</label>
    </div>

用到的 img：check.png
