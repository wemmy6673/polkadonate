import { useToastStore } from '@/store/toastStore'

// In production replace with actual Pinata / web3.storage calls
const MOCK_CID = 'QmPolkaDonate' + Math.random().toString(36).slice(2, 10)

export function useIPFS() {
  const toast = useToastStore((s) => s.add)

  /**
   * Upload metadata JSON + image to IPFS via Pinata
   * @param {Object} metadata  - { title, desc, category, goal, deadline }
   * @param {File}   imageFile - cover image File object
   * @returns {Promise<string>} IPFS CID
   */
  const uploadMetadata = async (metadata, imageFile) => {
    toast('pending', 'Uploading to IPFS…', 'Pinning metadata.json + cover image')

    // Simulate Pinata upload latency
    await new Promise((r) => setTimeout(r, 1800))

    const cid = `QmPD${Date.now().toString(36).toUpperCase()}`
    toast('success', 'IPFS Upload Complete', `CID: ${cid}`)
    return cid
  }

  /**
   * Fetch metadata JSON from IPFS gateway by CID
   * @param {string} cid
   * @returns {Promise<Object>}
   */
  const fetchMetadata = async (cid) => {
    const gateway = `https://gateway.pinata.cloud/ipfs/${cid}`
    const res = await fetch(gateway)
    if (!res.ok) throw new Error(`IPFS fetch failed: ${res.status}`)
    return res.json()
  }

  return { uploadMetadata, fetchMetadata }
}
