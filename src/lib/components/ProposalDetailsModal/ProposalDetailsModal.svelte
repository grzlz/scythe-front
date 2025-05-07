<!-- ProposalDetailsModal.svelte -->
<script>
	const { proposal, onClose } = $props();
</script>

<div class="modal fade show d-block"
	tabindex="-1"
	role="dialog"
	style="background-color: rgba(0, 0, 0, 0.5);"
>
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Detalles de la propuesta</h5>
				<button aria-label="close" type="button" class="btn-close" onclick={onClose}></button>
			</div>
			<div class="modal-body">
				<p><strong>ID:</strong> {proposal.id}</p>
				<p><strong>Título:</strong> {proposal.title}</p>
				<p><strong>Estado:</strong> {proposal.status}</p>
				<p><strong>Descripción:</strong> {proposal.description}</p>
				<p><strong>Votos a favor:</strong> {proposal.votes_for}</p>
				<p><strong>Votos en contra:</strong> {proposal.votes_against}</p>
				<p><strong>Fecha de creación:</strong> {new Date(proposal.created_at).toLocaleString()}</p>
			</div>
		</div>
	</div>
</div>
