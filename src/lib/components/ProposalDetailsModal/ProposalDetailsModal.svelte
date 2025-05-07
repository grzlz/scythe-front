<!-- ProposalDetailsModal.svelte -->
<script>
    import { fly } from 'svelte/transition'
    import { cubicOut, cubicIn } from 'svelte/easing';

	const { proposal, onClose } = $props();

    let commentInput = '';
	let comments = $state([
	]);

    function submitComment() {
		if (commentInput.trim() === '') return;

		comments = [...comments, { author: 'Tú', text: commentInput.trim() }];
		commentInput = '';
	}

</script>

<div class="modal fade show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}}>
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content" in:fly={{ y: 200, duration: 300, easing: cubicOut }}
            out:fly={{ y: 200, duration: 300, easing: cubicIn }}>
			<div class="modal-header border-0">
				<div>
					<h4 class="fw-bold mb-1">{proposal.title}</h4>
					<small class="text-muted">ID: {proposal.id} • {new Date(proposal.created_at).toLocaleString()}</small>
				</div>
				<button aria-label="close" type="button" class="btn-close" onclick={onClose}></button>
			</div>
			<div class="modal-body" >
                <div class="d-flex flex-wrap gap-3 mb-4">
					<div><span class="fw-semibold text-secondary">Estado:</span> {proposal.status}</div>
					<div><span class="fw-semibold text-success">✅ A favor:</span> {proposal.votes_for}</div>
					<div><span class="fw-semibold text-danger">❌ En contra:</span> {proposal.votes_against}</div>
				</div>

				<!-- Description -->
				<div class="mb-4">
					<h6 class="fw-semibold mb-2">Descripción</h6>
					<div class="p-3 bg-light border rounded">
						<p class="mb-0" style="white-space: pre-line;">{proposal.description}</p>
					</div>
				</div>
                <hr class="my-4" />

				<!-- Comentarios -->
				<h6>Comentarios</h6>
				<div class="mb-3">
					{#if comments.length === 0}
						<p class="text-muted">Aún no hay comentarios.</p>
					{:else}
						<ul class="list-group">
							{#each comments as c}
								<li class="list-group-item">
									<strong>{c.author}:</strong> {c.text}
								</li>
							{/each}
						</ul>
					{/if}
				</div>

                <div class="mb-3">
					<label aria-label="close" class="form-label">Escribe un comentario</label>
					<textarea bind:value={commentInput} rows="3" class="form-control" placeholder="Tu opinión..."></textarea>
				</div>
				<div class="text-end">
					<button class="btn btn-primary" onclick={submitComment}>Comentar</button>
				</div>


			</div>
		</div>
	</div>
</div>
