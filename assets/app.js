$('#converter').submit(function(e) {
	e.preventDefault();

	$form = $(this);
	$button = $form.find('[type="submit"]');
	$button.prop('disabled', true);
	$button.addClass('btn-loading');

	$.ajax({
		type: ($form.attr('method') || 'POST'),
		url: $form.attr('action'),
		data: $form.serialize(),
		dataType: 'json',
		cache: false,
		success: function(response) {
			if (
				response.hasOwnProperty('success') && response.success && 
				response.hasOwnProperty('data') && response.data.hasOwnProperty('result')
			) {
				$('#converter_result').html(response.data.result);
			} else {
				$('#converter_result').html(response.message || JSON.stringify(response));
			}

			$button.removeClass('btn-loading');
			$button.prop('disabled', false);
		},
		error: function(jqxhr, textStatus, errorThrown) {
			$('#converter_result').html(
				'Error' + (jqxhr.status > 0 && jqxhr.status != 200 ? ' ' + jqxhr.status : '') + ': ' +
				(jqxhr.responseText || errorThrown)
			);

			$button.removeClass('btn-loading');
			$button.prop('disabled', false);
		}
	});
});