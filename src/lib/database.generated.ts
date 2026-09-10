export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounting_accounts: {
        Row: {
          account_subtype: string | null
          account_type: string
          code: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          metadata: Json
          name: string
          normal_balance: string
          system_key: string | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          account_subtype?: string | null
          account_type: string
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          name: string
          normal_balance: string
          system_key?: string | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          account_subtype?: string | null
          account_type?: string
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          name?: string
          normal_balance?: string
          system_key?: string | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_accounts_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_accounts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_activation_evidence: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          chart_of_accounts_approved: boolean
          created_at: string
          evidence: Json
          historical_backfill_complete: boolean
          opening_balances_approved: boolean
          policy_signoff_complete: boolean
          reconciliation_complete: boolean
          report_contracts_verified: boolean
          source_coverage_complete: boolean
          updated_at: string
          workplace_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          chart_of_accounts_approved?: boolean
          created_at?: string
          evidence?: Json
          historical_backfill_complete?: boolean
          opening_balances_approved?: boolean
          policy_signoff_complete?: boolean
          reconciliation_complete?: boolean
          report_contracts_verified?: boolean
          source_coverage_complete?: boolean
          updated_at?: string
          workplace_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          chart_of_accounts_approved?: boolean
          created_at?: string
          evidence?: Json
          historical_backfill_complete?: boolean
          opening_balances_approved?: boolean
          policy_signoff_complete?: boolean
          reconciliation_complete?: boolean
          report_contracts_verified?: boolean
          source_coverage_complete?: boolean
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_activation_evidence_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_activation_history: {
        Row: {
          capture_from: string | null
          changed_at: string
          changed_by: string | null
          changed_by_role: string
          cutover_at: string | null
          evidence_snapshot: Json
          from_mode: string
          from_report_source: string
          id: number
          reason: string
          to_mode: string
          to_report_source: string
          workplace_id: string
        }
        Insert: {
          capture_from?: string | null
          changed_at?: string
          changed_by?: string | null
          changed_by_role: string
          cutover_at?: string | null
          evidence_snapshot?: Json
          from_mode: string
          from_report_source: string
          id?: never
          reason: string
          to_mode: string
          to_report_source: string
          workplace_id: string
        }
        Update: {
          capture_from?: string | null
          changed_at?: string
          changed_by?: string | null
          changed_by_role?: string
          cutover_at?: string | null
          evidence_snapshot?: Json
          from_mode?: string
          from_report_source?: string
          id?: never
          reason?: string
          to_mode?: string
          to_report_source?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_activation_history_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_activation_settings: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          capture_from: string | null
          created_at: string
          cutover_at: string | null
          metadata: Json
          mode: string
          report_source: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          capture_from?: string | null
          created_at?: string
          cutover_at?: string | null
          metadata?: Json
          mode?: string
          report_source?: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          capture_from?: string | null
          created_at?: string
          cutover_at?: string | null
          metadata?: Json
          mode?: string
          report_source?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_activation_settings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_events: {
        Row: {
          created_by: string | null
          description: string | null
          effective_at: string
          event_type: string
          id: string
          idempotency_key: string | null
          metadata: Json
          payload_hash: string
          recorded_at: string
          reverses_event_id: string | null
          source_id: string
          source_type: string
          source_version: number
          total_credit: number
          total_debit: number
          workplace_id: string
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          effective_at: string
          event_type: string
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          payload_hash: string
          recorded_at?: string
          reverses_event_id?: string | null
          source_id: string
          source_type: string
          source_version?: number
          total_credit: number
          total_debit: number
          workplace_id: string
        }
        Update: {
          created_by?: string | null
          description?: string | null
          effective_at?: string
          event_type?: string
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          payload_hash?: string
          recorded_at?: string
          reverses_event_id?: string | null
          source_id?: string
          source_type?: string
          source_version?: number
          total_credit?: number
          total_debit?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_events_reverses_event_id_fkey"
            columns: ["reverses_event_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_lines: {
        Row: {
          account_code: string
          account_id: string
          account_name: string
          account_normal_balance: string
          account_type: string
          contact_id: string | null
          created_at: string
          credit: number
          debit: number
          event_id: string
          id: number
          line_number: number
          memo: string | null
          metadata: Json
          party_amount: number | null
          party_role: string | null
          source_line_id: string | null
          source_line_type: string | null
          workplace_id: string
        }
        Insert: {
          account_code: string
          account_id: string
          account_name: string
          account_normal_balance: string
          account_type: string
          contact_id?: string | null
          created_at?: string
          credit?: number
          debit?: number
          event_id: string
          id?: never
          line_number: number
          memo?: string | null
          metadata?: Json
          party_amount?: number | null
          party_role?: string | null
          source_line_id?: string | null
          source_line_type?: string | null
          workplace_id: string
        }
        Update: {
          account_code?: string
          account_id?: string
          account_name?: string
          account_normal_balance?: string
          account_type?: string
          contact_id?: string | null
          created_at?: string
          credit?: number
          debit?: number
          event_id?: string
          id?: never
          line_number?: number
          memo?: string | null
          metadata?: Json
          party_amount?: number | null
          party_role?: string | null
          source_line_id?: string | null
          source_line_type?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_lines_account_workplace_fkey"
            columns: ["account_id", "workplace_id"]
            referencedRelation: "accounting_accounts"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "accounting_lines_contact_workplace_fkey"
            columns: ["contact_id", "workplace_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "accounting_lines_event_workplace_fkey"
            columns: ["event_id", "workplace_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id", "workplace_id"]
          },
        ]
      }
      accounting_source_account_mappings: {
        Row: {
          account_id: string
          approved_at: string
          approved_by: string | null
          created_at: string
          notes: string | null
          source_key: string
          source_table: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          account_id: string
          approved_at?: string
          approved_by?: string | null
          created_at?: string
          notes?: string | null
          source_key: string
          source_table: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          account_id?: string
          approved_at?: string
          approved_by?: string | null
          created_at?: string
          notes?: string | null
          source_key?: string
          source_table?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_source_account_mappings_account_fkey"
            columns: ["account_id", "workplace_id"]
            referencedRelation: "accounting_accounts"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "accounting_source_account_mappings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_source_captures: {
        Row: {
          accounting_event_id: string | null
          created_at: string
          error: string | null
          id: string
          payload: Json
          payload_hash: string
          processed_at: string | null
          resolution: string | null
          reversal_event_id: string | null
          source_id: string
          source_operation: string
          source_recorded_at: string
          source_table: string
          source_version: number
          status: string
          workplace_id: string
        }
        Insert: {
          accounting_event_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          payload: Json
          payload_hash: string
          processed_at?: string | null
          resolution?: string | null
          reversal_event_id?: string | null
          source_id: string
          source_operation: string
          source_recorded_at?: string
          source_table: string
          source_version: number
          status?: string
          workplace_id: string
        }
        Update: {
          accounting_event_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          payload?: Json
          payload_hash?: string
          processed_at?: string | null
          resolution?: string | null
          reversal_event_id?: string | null
          source_id?: string
          source_operation?: string
          source_recorded_at?: string
          source_table?: string
          source_version?: number
          status?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_source_captures_accounting_event_id_fkey"
            columns: ["accounting_event_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_source_captures_reversal_event_id_fkey"
            columns: ["reversal_event_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_source_captures_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_mappings: {
        Row: {
          activity_id: string | null
          conditions: Json | null
          created_at: string | null
          created_by: string | null
          entity_type_id: string | null
          id: string
          industry_id: string | null
          is_required: boolean | null
          rule_id: string | null
          sub_industry_id: string | null
          trigger_groups: Json | null
        }
        Insert: {
          activity_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          entity_type_id?: string | null
          id?: string
          industry_id?: string | null
          is_required?: boolean | null
          rule_id?: string | null
          sub_industry_id?: string | null
          trigger_groups?: Json | null
        }
        Update: {
          activity_id?: string | null
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          entity_type_id?: string | null
          id?: string
          industry_id?: string | null
          is_required?: boolean | null
          rule_id?: string | null
          sub_industry_id?: string | null
          trigger_groups?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_mappings_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "specific_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_mappings_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          attention: string | null
          city: string
          contact_id: string
          country: string
          created_at: string | null
          id: string
          is_default: boolean | null
          phone: string | null
          pincode: string
          state: string
          type: Database["public"]["Enums"]["address_type"]
          updated_at: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          attention?: string | null
          city: string
          contact_id: string
          country?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          phone?: string | null
          pincode: string
          state: string
          type?: Database["public"]["Enums"]["address_type"]
          updated_at?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          attention?: string | null
          city?: string
          contact_id?: string
          country?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          phone?: string | null
          pincode?: string
          state?: string
          type?: Database["public"]["Enums"]["address_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_report_events: {
        Row: {
          created_at: string
          created_by: string | null
          event_type: string
          id: string
          message: string | null
          metadata: Json
          run_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          event_type: string
          id?: string
          message?: string | null
          metadata?: Json
          run_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          event_type?: string
          id?: string
          message?: string | null
          metadata?: Json
          run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_report_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_events_run_id_fkey"
            columns: ["run_id"]
            referencedRelation: "admin_report_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_report_runs: {
        Row: {
          ai_mode: string
          ai_sections: Json
          approved_at: string | null
          approved_by: string | null
          assigned_to: string | null
          client_summary: string | null
          created_at: string
          created_by: string
          delivered_at: string | null
          editor_notes: string | null
          exception_summary: string | null
          financial_year: string | null
          id: string
          parameters: Json
          period_end: string | null
          period_start: string | null
          published_snapshot_id: string | null
          report_category: string
          report_key: string
          report_name: string
          report_type: string
          source_report_data: Json | null
          source_snapshot_id: string | null
          status: string
          updated_at: string
          updated_by: string | null
          workplace_id: string
        }
        Insert: {
          ai_mode?: string
          ai_sections?: Json
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          client_summary?: string | null
          created_at?: string
          created_by: string
          delivered_at?: string | null
          editor_notes?: string | null
          exception_summary?: string | null
          financial_year?: string | null
          id?: string
          parameters?: Json
          period_end?: string | null
          period_start?: string | null
          published_snapshot_id?: string | null
          report_category?: string
          report_key: string
          report_name: string
          report_type: string
          source_report_data?: Json | null
          source_snapshot_id?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
          workplace_id: string
        }
        Update: {
          ai_mode?: string
          ai_sections?: Json
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          client_summary?: string | null
          created_at?: string
          created_by?: string
          delivered_at?: string | null
          editor_notes?: string | null
          exception_summary?: string | null
          financial_year?: string | null
          id?: string
          parameters?: Json
          period_end?: string | null
          period_start?: string | null
          published_snapshot_id?: string | null
          report_category?: string
          report_key?: string
          report_name?: string
          report_type?: string
          source_report_data?: Json | null
          source_snapshot_id?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_report_runs_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_published_snapshot_id_fkey"
            columns: ["published_snapshot_id"]
            referencedRelation: "report_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_source_snapshot_id_fkey"
            columns: ["source_snapshot_id"]
            referencedRelation: "report_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_runs_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_report_versions: {
        Row: {
          ai_sections: Json
          change_note: string | null
          created_at: string
          created_by: string
          editor_notes: string | null
          id: string
          parameters: Json
          run_id: string
          source_report_data: Json | null
          status: string
          version_number: number
        }
        Insert: {
          ai_sections?: Json
          change_note?: string | null
          created_at?: string
          created_by: string
          editor_notes?: string | null
          id?: string
          parameters?: Json
          run_id: string
          source_report_data?: Json | null
          status: string
          version_number: number
        }
        Update: {
          ai_sections?: Json
          change_note?: string | null
          created_at?: string
          created_by?: string
          editor_notes?: string | null
          id?: string
          parameters?: Json
          run_id?: string
          source_report_data?: Json | null
          status?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "admin_report_versions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_report_versions_run_id_fkey"
            columns: ["run_id"]
            referencedRelation: "admin_report_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_action_policies: {
        Row: {
          action_type: string
          applier_key: string | null
          created_at: string
          description: string
          id: string
          implemented: boolean
          max_risk_level: string
          module_key: string
          required_fields: string[]
          safety_level: string
          source_type: string
          updated_at: string
        }
        Insert: {
          action_type: string
          applier_key?: string | null
          created_at?: string
          description: string
          id?: string
          implemented?: boolean
          max_risk_level?: string
          module_key: string
          required_fields?: string[]
          safety_level?: string
          source_type?: string
          updated_at?: string
        }
        Update: {
          action_type?: string
          applier_key?: string | null
          created_at?: string
          description?: string
          id?: string
          implemented?: boolean
          max_risk_level?: string
          module_key?: string
          required_fields?: string[]
          safety_level?: string
          source_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      agent_autopilot_runs: {
        Row: {
          amplify_project_id: string | null
          autopilot_id: string
          completed_at: string | null
          created_at: string | null
          failure_reason: string | null
          id: string
          idempotency_key: string | null
          result: Json | null
          source: string
          status: string
          task_id: string | null
          ticket_id: string | null
          trigger_id: string | null
          trigger_payload: Json | null
          triggered_at: string
        }
        Insert: {
          amplify_project_id?: string | null
          autopilot_id: string
          completed_at?: string | null
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          idempotency_key?: string | null
          result?: Json | null
          source: string
          status?: string
          task_id?: string | null
          ticket_id?: string | null
          trigger_id?: string | null
          trigger_payload?: Json | null
          triggered_at?: string
        }
        Update: {
          amplify_project_id?: string | null
          autopilot_id?: string
          completed_at?: string | null
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          idempotency_key?: string | null
          result?: Json | null
          source?: string
          status?: string
          task_id?: string | null
          ticket_id?: string | null
          trigger_id?: string | null
          trigger_payload?: Json | null
          triggered_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_autopilot_runs_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilot_runs_autopilot_id_fkey"
            columns: ["autopilot_id"]
            referencedRelation: "agent_autopilots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilot_runs_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "agent_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilot_runs_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilot_runs_trigger_id_fkey"
            columns: ["trigger_id"]
            referencedRelation: "agent_autopilot_triggers"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_autopilot_triggers: {
        Row: {
          autopilot_id: string
          created_at: string | null
          cron_expression: string | null
          enabled: boolean
          id: string
          kind: string
          label: string | null
          last_fired_at: string | null
          next_run_at: string | null
          timezone: string | null
          updated_at: string | null
          webhook_token: string | null
        }
        Insert: {
          autopilot_id: string
          created_at?: string | null
          cron_expression?: string | null
          enabled?: boolean
          id?: string
          kind: string
          label?: string | null
          last_fired_at?: string | null
          next_run_at?: string | null
          timezone?: string | null
          updated_at?: string | null
          webhook_token?: string | null
        }
        Update: {
          autopilot_id?: string
          created_at?: string | null
          cron_expression?: string | null
          enabled?: boolean
          id?: string
          kind?: string
          label?: string | null
          last_fired_at?: string | null
          next_run_at?: string | null
          timezone?: string | null
          updated_at?: string | null
          webhook_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_autopilot_triggers_autopilot_id_fkey"
            columns: ["autopilot_id"]
            referencedRelation: "agent_autopilots"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_autopilots: {
        Row: {
          agent_group_id: string | null
          amplify_project_id: string | null
          assignee_id: string
          created_at: string | null
          created_by_id: string
          created_by_type: string
          description: string | null
          execution_mode: string
          id: string
          last_run_at: string | null
          stage_key: string | null
          status: string
          system_key: string | null
          ticket_title_template: string | null
          title: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          agent_group_id?: string | null
          amplify_project_id?: string | null
          assignee_id: string
          created_at?: string | null
          created_by_id: string
          created_by_type: string
          description?: string | null
          execution_mode?: string
          id?: string
          last_run_at?: string | null
          stage_key?: string | null
          status?: string
          system_key?: string | null
          ticket_title_template?: string | null
          title: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          agent_group_id?: string | null
          amplify_project_id?: string | null
          assignee_id?: string
          created_at?: string | null
          created_by_id?: string
          created_by_type?: string
          description?: string | null
          execution_mode?: string
          id?: string
          last_run_at?: string | null
          stage_key?: string | null
          status?: string
          system_key?: string | null
          ticket_title_template?: string | null
          title?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_autopilots_agent_group_id_fkey"
            columns: ["agent_group_id"]
            referencedRelation: "agent_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilots_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilots_assignee_id_fkey"
            columns: ["assignee_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_autopilots_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_group_members: {
        Row: {
          created_at: string
          group_id: string
          member_id: string
          member_type: string
          notes: string | null
          role: string
        }
        Insert: {
          created_at?: string
          group_id: string
          member_id: string
          member_type: string
          notes?: string | null
          role?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          member_id?: string
          member_type?: string
          notes?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_group_members_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "agent_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_groups: {
        Row: {
          archived_at: string | null
          created_at: string
          description: string | null
          id: string
          instructions: string | null
          leader_agent_id: string
          metadata: Json
          name: string
          stage_key: string | null
          status: string
          system_key: string | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instructions?: string | null
          leader_agent_id: string
          metadata?: Json
          name: string
          stage_key?: string | null
          status?: string
          system_key?: string | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instructions?: string | null
          leader_agent_id?: string
          metadata?: Json
          name?: string
          stage_key?: string | null
          status?: string
          system_key?: string | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_groups_leader_agent_id_fkey"
            columns: ["leader_agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_groups_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_profiles: {
        Row: {
          apps: Json | null
          archived_at: string | null
          archived_by: string | null
          avatar_url: string | null
          created_at: string | null
          department: string
          id: string
          instructions: string
          max_concurrent_tasks: number
          model: string
          name: string
          status: string
          updated_at: string | null
          visibility: string
          workplace_id: string
        }
        Insert: {
          apps?: Json | null
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          created_at?: string | null
          department: string
          id?: string
          instructions: string
          max_concurrent_tasks?: number
          model?: string
          name: string
          status?: string
          updated_at?: string | null
          visibility?: string
          workplace_id: string
        }
        Update: {
          apps?: Json | null
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          created_at?: string | null
          department?: string
          id?: string
          instructions?: string
          max_concurrent_tasks?: number
          model?: string
          name?: string
          status?: string
          updated_at?: string | null
          visibility?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_profiles_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_proposed_actions: {
        Row: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          action_type: string
          agent_id?: string | null
          amplify_project_id?: string | null
          applied_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by_id?: string | null
          created_by_type?: string
          decided_at?: string | null
          error?: string | null
          id?: string
          payload?: Json
          rejected_by?: string | null
          risk_level?: string
          source_id?: string | null
          source_type?: string | null
          status?: string
          summary?: string | null
          task_id?: string | null
          title: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          action_type?: string
          agent_id?: string | null
          amplify_project_id?: string | null
          applied_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by_id?: string | null
          created_by_type?: string
          decided_at?: string | null
          error?: string | null
          id?: string
          payload?: Json
          rejected_by?: string | null
          risk_level?: string
          source_id?: string | null
          source_type?: string | null
          status?: string
          summary?: string | null
          task_id?: string | null
          title?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_proposed_actions_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_proposed_actions_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_proposed_actions_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_proposed_actions_rejected_by_fkey"
            columns: ["rejected_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_proposed_actions_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "agent_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_proposed_actions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_skill_assignments: {
        Row: {
          agent_id: string
          created_at: string | null
          skill_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          skill_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_skill_assignments_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_skill_assignments_skill_id_fkey"
            columns: ["skill_id"]
            referencedRelation: "agent_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_skill_files: {
        Row: {
          content: string
          created_at: string | null
          id: string
          path: string
          skill_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          path: string
          skill_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          path?: string
          skill_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_skill_files_skill_id_fkey"
            columns: ["skill_id"]
            referencedRelation: "agent_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_skills: {
        Row: {
          config: Json
          content: string
          created_at: string | null
          created_by_id: string | null
          created_by_type: string
          description: string
          id: string
          name: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          config?: Json
          content?: string
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string
          id?: string
          name: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          config?: Json
          content?: string
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_skills_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_task_logs: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          input: Json | null
          output: string | null
          seq: number
          task_id: string
          tool: string | null
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          input?: Json | null
          output?: string | null
          seq: number
          task_id: string
          tool?: string | null
          type: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          input?: Json | null
          output?: string | null
          seq?: number
          task_id?: string
          tool?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_task_logs_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "agent_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tasks: {
        Row: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }
        Insert: {
          agent_group_id?: string | null
          agent_id: string
          amplify_project_id?: string | null
          attempt?: number
          autopilot_run_id?: string | null
          completed_at?: string | null
          context?: Json | null
          created_at?: string | null
          depends_on?: string[] | null
          description?: string | null
          dispatched_at?: string | null
          error?: string | null
          failure_reason?: string | null
          id?: string
          max_attempts?: number
          parent_task_id?: string | null
          priority?: number
          recovered_at?: string | null
          recovery_count?: number
          result?: Json | null
          runtime_heartbeat_at?: string | null
          runtime_id?: string | null
          runtime_lease_expires_at?: string | null
          source_id?: string | null
          source_type?: string | null
          stage_key?: string | null
          started_at?: string | null
          status?: string
          system_key?: string | null
          ticket_id?: string | null
          title: string
          trigger_summary?: string | null
          workplace_id: string
        }
        Update: {
          agent_group_id?: string | null
          agent_id?: string
          amplify_project_id?: string | null
          attempt?: number
          autopilot_run_id?: string | null
          completed_at?: string | null
          context?: Json | null
          created_at?: string | null
          depends_on?: string[] | null
          description?: string | null
          dispatched_at?: string | null
          error?: string | null
          failure_reason?: string | null
          id?: string
          max_attempts?: number
          parent_task_id?: string | null
          priority?: number
          recovered_at?: string | null
          recovery_count?: number
          result?: Json | null
          runtime_heartbeat_at?: string | null
          runtime_id?: string | null
          runtime_lease_expires_at?: string | null
          source_id?: string | null
          source_type?: string | null
          stage_key?: string | null
          started_at?: string | null
          status?: string
          system_key?: string | null
          ticket_id?: string | null
          title?: string
          trigger_summary?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tasks_agent_group_id_fkey"
            columns: ["agent_group_id"]
            referencedRelation: "agent_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            referencedRelation: "agent_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_messages_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "ai_chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_references: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          message_id: string
          reference_id: string
          reference_type: string
          referenced_at: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          message_id: string
          reference_id: string
          reference_type: string
          referenced_at?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          message_id?: string
          reference_id?: string
          reference_type?: string
          referenced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_references_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "ai_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_session_reads: {
        Row: {
          created_at: string
          id: string
          last_read_at: string
          last_read_message_id: string | null
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_read_at?: string
          last_read_message_id?: string | null
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_read_at?: string
          last_read_message_id?: string | null
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_session_reads_last_read_message_id_fkey"
            columns: ["last_read_message_id"]
            referencedRelation: "ai_chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_session_reads_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "ai_chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_session_reads_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_sessions: {
        Row: {
          context: string | null
          created_at: string | null
          created_by: string
          id: string
          workplace_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          workplace_id: string
        }
        Update: {
          context?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_sessions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_sessions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_events: {
        Row: {
          correlation_id: string | null
          cost_inr: number
          created_at: string
          credits: number
          feature: string | null
          id: string
          latency_ms: number | null
          model: string | null
          success: boolean
          surface: string | null
          tokens_in: number | null
          tokens_out: number | null
          user_id: string | null
          workplace_id: string
        }
        Insert: {
          correlation_id?: string | null
          cost_inr?: number
          created_at?: string
          credits?: number
          feature?: string | null
          id?: string
          latency_ms?: number | null
          model?: string | null
          success?: boolean
          surface?: string | null
          tokens_in?: number | null
          tokens_out?: number | null
          user_id?: string | null
          workplace_id: string
        }
        Update: {
          correlation_id?: string | null
          cost_inr?: number
          created_at?: string
          credits?: number
          feature?: string | null
          id?: string
          latency_ms?: number | null
          model?: string | null
          success?: boolean
          surface?: string | null
          tokens_in?: number | null
          tokens_out?: number | null
          user_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_rollups: {
        Row: {
          cost_inr: number
          credits_used: number
          event_count: number
          period: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          cost_inr?: number
          credits_used?: number
          event_count?: number
          period: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          cost_inr?: number
          credits_used?: number
          event_count?: number
          period?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_rollups_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_backend_connections: {
        Row: {
          anon_key: string
          app_id: string
          created_at: string
          created_by: string | null
          id: string
          last_error: string | null
          last_validated_at: string | null
          project_ref: string | null
          project_url: string
          provider: string
          status: string
          workplace_id: string
        }
        Insert: {
          anon_key: string
          app_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          last_error?: string | null
          last_validated_at?: string | null
          project_ref?: string | null
          project_url: string
          provider?: string
          status?: string
          workplace_id: string
        }
        Update: {
          anon_key?: string
          app_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          last_error?: string | null
          last_validated_at?: string | null
          project_ref?: string | null
          project_url?: string
          provider?: string
          status?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_backend_connections_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_app_backend_connections_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_data_tokens: {
        Row: {
          app_id: string
          created_at: string
          expires_at: string
          id: string
          member_id: string
          token_hash: string
          workplace_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          expires_at: string
          id?: string
          member_id: string
          token_hash: string
          workplace_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          member_id?: string
          token_hash?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_data_tokens_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_app_data_tokens_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_domains: {
        Row: {
          app_id: string
          created_at: string
          created_by: string | null
          hostname: string
          id: string
          last_checked_at: string | null
          last_error: string | null
          status: string
          verification_token: string
          workplace_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          created_by?: string | null
          hostname: string
          id?: string
          last_checked_at?: string | null
          last_error?: string | null
          status?: string
          verification_token?: string
          workplace_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          created_by?: string | null
          hostname?: string
          id?: string
          last_checked_at?: string | null
          last_error?: string | null
          status?: string
          verification_token?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_domains_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_app_domains_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_member_shares: {
        Row: {
          app_id: string
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          label: string | null
          revoked_at: string | null
          token_hash: string
          token_prefix: string
          workplace_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          label?: string | null
          revoked_at?: string | null
          token_hash: string
          token_prefix: string
          workplace_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          label?: string | null
          revoked_at?: string | null
          token_hash?: string
          token_prefix?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_member_shares_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_turns: {
        Row: {
          app_id: string
          changed: Json | null
          created_at: string
          created_by: string | null
          highlights: Json | null
          id: string
          is_error: boolean
          mode: string
          role: string
          suggestions: Json | null
          text: string
          version_number: number | null
          workplace_id: string
        }
        Insert: {
          app_id: string
          changed?: Json | null
          created_at?: string
          created_by?: string | null
          highlights?: Json | null
          id?: string
          is_error?: boolean
          mode?: string
          role: string
          suggestions?: Json | null
          text: string
          version_number?: number | null
          workplace_id: string
        }
        Update: {
          app_id?: string
          changed?: Json | null
          created_at?: string
          created_by?: string | null
          highlights?: Json | null
          id?: string
          is_error?: boolean
          mode?: string
          role?: string
          suggestions?: Json | null
          text?: string
          version_number?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_turns_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_app_turns_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_app_versions: {
        Row: {
          app_id: string
          created_at: string
          created_by: string | null
          files: Json
          id: string
          notes: string | null
          prompt: string | null
          version_number: number
          workplace_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          created_by?: string | null
          files?: Json
          id?: string
          notes?: string | null
          prompt?: string | null
          version_number: number
          workplace_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          created_by?: string | null
          files?: Json
          id?: string
          notes?: string | null
          prompt?: string | null
          version_number?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_app_versions_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_app_versions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_apps: {
        Row: {
          archived_at: string | null
          backend_mode: string
          created_at: string
          created_by: string | null
          data_access: boolean
          data_snapshot: Json | null
          description: string | null
          id: string
          name: string
          published_at: string | null
          published_version_id: string | null
          slug: string
          status: string
          template_key: string
          thumbnail: string | null
          updated_at: string
          visibility: string
          workplace_id: string
        }
        Insert: {
          archived_at?: string | null
          backend_mode?: string
          created_at?: string
          created_by?: string | null
          data_access?: boolean
          data_snapshot?: Json | null
          description?: string | null
          id?: string
          name: string
          published_at?: string | null
          published_version_id?: string | null
          slug: string
          status?: string
          template_key?: string
          thumbnail?: string | null
          updated_at?: string
          visibility?: string
          workplace_id: string
        }
        Update: {
          archived_at?: string | null
          backend_mode?: string
          created_at?: string
          created_by?: string | null
          data_access?: boolean
          data_snapshot?: Json | null
          description?: string | null
          id?: string
          name?: string
          published_at?: string | null
          published_version_id?: string | null
          slug?: string
          status?: string
          template_key?: string
          thumbnail?: string | null
          updated_at?: string
          visibility?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_apps_published_version_id_fkey"
            columns: ["published_version_id"]
            referencedRelation: "amplify_app_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_apps_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_inbox_items: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          archived: boolean
          body: string | null
          created_at: string | null
          details: Json | null
          id: string
          read: boolean
          recipient_id: string
          recipient_type: string
          severity: string
          ticket_id: string | null
          title: string
          type: string
          workplace_id: string
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          archived?: boolean
          body?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          read?: boolean
          recipient_id: string
          recipient_type: string
          severity?: string
          ticket_id?: string | null
          title: string
          type: string
          workplace_id: string
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          archived?: boolean
          body?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          read?: boolean
          recipient_id?: string
          recipient_type?: string
          severity?: string
          ticket_id?: string | null
          title?: string
          type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_inbox_items_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_inbox_items_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_project_links: {
        Row: {
          created_at: string
          id: string
          label: string | null
          metadata: Json
          project_id: string
          source_id: string
          source_type: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          metadata?: Json
          project_id: string
          source_id: string
          source_type: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          metadata?: Json
          project_id?: string
          source_id?: string
          source_type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_project_links_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_project_links_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_projects: {
        Row: {
          archived_at: string | null
          context_file_id: string | null
          created_at: string
          created_by_agent_id: string | null
          created_by_id: string | null
          created_by_type: string
          description: string | null
          icon: string | null
          id: string
          lead_id: string | null
          lead_type: string | null
          metadata: Json
          priority: string
          proposal_status: string
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          status: string
          system_key: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          archived_at?: string | null
          context_file_id?: string | null
          created_at?: string
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          lead_id?: string | null
          lead_type?: string | null
          metadata?: Json
          priority?: string
          proposal_status?: string
          source_id?: string | null
          source_type?: string | null
          stage_key?: string | null
          status?: string
          system_key?: string | null
          title: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          archived_at?: string | null
          context_file_id?: string | null
          created_at?: string
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          lead_id?: string | null
          lead_type?: string | null
          metadata?: Json
          priority?: string
          proposal_status?: string
          source_id?: string | null
          source_type?: string | null
          stage_key?: string | null
          status?: string
          system_key?: string | null
          title?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_projects_context_file_id_fkey"
            columns: ["context_file_id"]
            referencedRelation: "workspace_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_projects_created_by_agent_id_fkey"
            columns: ["created_by_agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_projects_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_stages: {
        Row: {
          archived_at: string | null
          color: string | null
          created_at: string
          created_by_agent_id: string | null
          created_by_id: string | null
          created_by_type: string
          description: string | null
          icon: string | null
          id: string
          is_default: boolean
          key: string
          label: string
          metadata: Json
          sort_order: number
          status: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          archived_at?: string | null
          color?: string | null
          created_at?: string
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_default?: boolean
          key: string
          label: string
          metadata?: Json
          sort_order?: number
          status?: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          archived_at?: string | null
          color?: string | null
          created_at?: string
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_default?: boolean
          key?: string
          label?: string
          metadata?: Json
          sort_order?: number
          status?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_stages_created_by_agent_id_fkey"
            columns: ["created_by_agent_id"]
            referencedRelation: "agent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_stages_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      amplify_tasks: {
        Row: {
          archived_at: string | null
          created_at: string | null
          created_by_agent_id: string | null
          created_by_id: string | null
          created_by_type: string | null
          depends_on: string[] | null
          description: string | null
          id: string
          metadata: Json | null
          project_id: string
          sort_order: number | null
          status: string
          support_ticket_id: string | null
          title: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string | null
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string | null
          depends_on?: string[] | null
          description?: string | null
          id?: string
          metadata?: Json | null
          project_id: string
          sort_order?: number | null
          status?: string
          support_ticket_id?: string | null
          title: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string | null
          created_by_agent_id?: string | null
          created_by_id?: string | null
          created_by_type?: string | null
          depends_on?: string[] | null
          description?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string
          sort_order?: number | null
          status?: string
          support_ticket_id?: string | null
          title?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amplify_tasks_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_tasks_support_ticket_id_fkey"
            columns: ["support_ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amplify_tasks_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by: string
          id: string
          name: string
          reference_id: string
          reference_type: string
          size: number | null
          url: string
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          name: string
          reference_id: string
          reference_type: string
          size?: number | null
          url: string
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          name?: string
          reference_id?: string
          reference_type?: string
          size?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string
          id: string
          marked_by: string
          overtime_amount: number | null
          staff_id: string
          status: string
          workplace_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date: string
          id?: string
          marked_by: string
          overtime_amount?: number | null
          staff_id: string
          status: string
          workplace_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string
          id?: string
          marked_by?: string
          overtime_amount?: number | null
          staff_id?: string
          status?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_marked_by_fkey"
            columns: ["marked_by"]
            referencedRelation: "workplace_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff_payment_summary"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "attendance_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_settings: {
        Row: {
          created_at: string | null
          employee_id_counter: number | null
          employee_id_prefix: string | null
          id: string
          mark_present_by_default: boolean | null
          reminder_time: string | null
          shift_hours: number | null
          weekly_off_days: number[] | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          employee_id_counter?: number | null
          employee_id_prefix?: string | null
          id?: string
          mark_present_by_default?: boolean | null
          reminder_time?: string | null
          shift_hours?: number | null
          weekly_off_days?: number[] | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          employee_id_counter?: number | null
          employee_id_prefix?: string | null
          id?: string
          mark_present_by_default?: boolean | null
          reminder_time?: string | null
          shift_hours?: number | null
          weekly_off_days?: number[] | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_settings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string
          account_type: string | null
          balance: number | null
          bank_name: string
          created_at: string | null
          id: string
          ifsc_code: string | null
          is_active: boolean | null
          is_default: boolean | null
          is_primary: boolean | null
          opening_balance: number | null
          updated_at: string | null
          upi_id: string | null
          workplace_id: string
        }
        Insert: {
          account_name: string
          account_number: string
          account_type?: string | null
          balance?: number | null
          bank_name: string
          created_at?: string | null
          id?: string
          ifsc_code?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          is_primary?: boolean | null
          opening_balance?: number | null
          updated_at?: string | null
          upi_id?: string | null
          workplace_id: string
        }
        Update: {
          account_name?: string
          account_number?: string
          account_type?: string | null
          balance?: number | null
          bank_name?: string
          created_at?: string | null
          id?: string
          ifsc_code?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          is_primary?: boolean | null
          opening_balance?: number | null
          updated_at?: string | null
          upi_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_ledger_entries: {
        Row: {
          amount: number
          bank_account_id: string
          cleared_by_statement_line_id: string | null
          counts_towards_balance: boolean
          created_at: string
          entry_date: string
          id: string
          source_id: string
          source_snapshot: Json
          source_type: string
          status: string
          updated_at: string
          voided_at: string | null
          workplace_id: string
        }
        Insert: {
          amount: number
          bank_account_id: string
          cleared_by_statement_line_id?: string | null
          counts_towards_balance?: boolean
          created_at?: string
          entry_date: string
          id?: string
          source_id: string
          source_snapshot?: Json
          source_type: string
          status?: string
          updated_at?: string
          voided_at?: string | null
          workplace_id: string
        }
        Update: {
          amount?: number
          bank_account_id?: string
          cleared_by_statement_line_id?: string | null
          counts_towards_balance?: boolean
          created_at?: string
          entry_date?: string
          id?: string
          source_id?: string
          source_snapshot?: Json
          source_type?: string
          status?: string
          updated_at?: string
          voided_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_ledger_entries_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_ledger_entries_cleared_by_statement_line_id_fkey"
            columns: ["cleared_by_statement_line_id"]
            referencedRelation: "bank_statement_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_ledger_entries_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_ledger_entry_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          current_record: Json | null
          id: number
          ledger_entry_id: string
          operation: string
          previous_record: Json | null
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          current_record?: Json | null
          id?: never
          ledger_entry_id: string
          operation: string
          previous_record?: Json | null
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          current_record?: Json | null
          id?: never
          ledger_entry_id?: string
          operation?: string
          previous_record?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_ledger_entry_history_ledger_entry_id_fkey"
            columns: ["ledger_entry_id"]
            referencedRelation: "bank_ledger_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_statement_lines: {
        Row: {
          amount: number
          bank_account_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          matched_to: string | null
          matched_type: string | null
          reference: string | null
          running_balance: number | null
          statement_id: string
          updated_at: string | null
          workplace_id: string | null
        }
        Insert: {
          amount: number
          bank_account_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          matched_to?: string | null
          matched_type?: string | null
          reference?: string | null
          running_balance?: number | null
          statement_id: string
          updated_at?: string | null
          workplace_id?: string | null
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          matched_to?: string | null
          matched_type?: string | null
          reference?: string | null
          running_balance?: number | null
          statement_id?: string
          updated_at?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_statement_lines_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_statement_lines_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_transactions: {
        Row: {
          balance: number | null
          bank_account_id: string
          created_at: string | null
          created_by: string | null
          credit_amount: number | null
          debit_amount: number | null
          description: string
          id: string
          import_batch_id: string | null
          is_matched: boolean | null
          match_confidence: number | null
          matched_invoice_id: string | null
          matched_payment_id: string | null
          reference_number: string | null
          source: string | null
          transaction_date: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          balance?: number | null
          bank_account_id: string
          created_at?: string | null
          created_by?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description: string
          id?: string
          import_batch_id?: string | null
          is_matched?: boolean | null
          match_confidence?: number | null
          matched_invoice_id?: string | null
          matched_payment_id?: string | null
          reference_number?: string | null
          source?: string | null
          transaction_date: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          balance?: number | null
          bank_account_id?: string
          created_at?: string | null
          created_by?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string
          id?: string
          import_batch_id?: string | null
          is_matched?: boolean | null
          match_confidence?: number | null
          matched_invoice_id?: string | null
          matched_payment_id?: string | null
          reference_number?: string | null
          source?: string | null
          transaction_date?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transactions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transactions_matched_invoice_id_fkey"
            columns: ["matched_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transactions_matched_payment_id_fkey"
            columns: ["matched_payment_id"]
            referencedRelation: "invoice_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transactions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      barcode_print_queue: {
        Row: {
          barcode_value: string
          batch_id: string | null
          created_at: string | null
          created_by: string | null
          error_message: string | null
          id: string
          mrp: number | null
          price: number | null
          print_status: string | null
          printed_at: string | null
          printed_by: string | null
          product_id: string | null
          product_name: string | null
          quantity: number | null
          sku: string | null
          template_id: string | null
          workplace_id: string
        }
        Insert: {
          barcode_value: string
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          mrp?: number | null
          price?: number | null
          print_status?: string | null
          printed_at?: string | null
          printed_by?: string | null
          product_id?: string | null
          product_name?: string | null
          quantity?: number | null
          sku?: string | null
          template_id?: string | null
          workplace_id: string
        }
        Update: {
          barcode_value?: string
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          mrp?: number | null
          price?: number | null
          print_status?: string | null
          printed_at?: string | null
          printed_by?: string | null
          product_id?: string | null
          product_name?: string | null
          quantity?: number | null
          sku?: string | null
          template_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "barcode_print_queue_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "inventory_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barcode_print_queue_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barcode_print_queue_printed_by_fkey"
            columns: ["printed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barcode_print_queue_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barcode_print_queue_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "barcode_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barcode_print_queue_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      barcode_templates: {
        Row: {
          barcode_height: number | null
          barcode_type: string | null
          created_at: string | null
          font_size: number | null
          id: string
          is_default: boolean | null
          label_height_mm: number | null
          label_width_mm: number | null
          layout_config: Json | null
          show_batch: boolean | null
          show_expiry: boolean | null
          show_hsn: boolean | null
          show_mrp: boolean | null
          show_price: boolean | null
          show_product_name: boolean | null
          show_sku: boolean | null
          template_name: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          barcode_height?: number | null
          barcode_type?: string | null
          created_at?: string | null
          font_size?: number | null
          id?: string
          is_default?: boolean | null
          label_height_mm?: number | null
          label_width_mm?: number | null
          layout_config?: Json | null
          show_batch?: boolean | null
          show_expiry?: boolean | null
          show_hsn?: boolean | null
          show_mrp?: boolean | null
          show_price?: boolean | null
          show_product_name?: boolean | null
          show_sku?: boolean | null
          template_name: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          barcode_height?: number | null
          barcode_type?: string | null
          created_at?: string | null
          font_size?: number | null
          id?: string
          is_default?: boolean | null
          label_height_mm?: number | null
          label_width_mm?: number | null
          layout_config?: Json | null
          show_batch?: boolean | null
          show_expiry?: boolean | null
          show_hsn?: boolean | null
          show_mrp?: boolean | null
          show_price?: boolean | null
          show_product_name?: boolean | null
          show_sku?: boolean | null
          template_name?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "barcode_templates_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      business_criteria_state: {
        Row: {
          amplify_project_id: string | null
          completed_at: string | null
          completed_by: string | null
          criteria_key: string
          id: string
          last_evaluated_at: string | null
          manual_data: Json | null
          stage_key: string | null
          status: string
          system_evidence: Json | null
          system_key: string | null
          workplace_id: string
        }
        Insert: {
          amplify_project_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          criteria_key: string
          id?: string
          last_evaluated_at?: string | null
          manual_data?: Json | null
          stage_key?: string | null
          status?: string
          system_evidence?: Json | null
          system_key?: string | null
          workplace_id: string
        }
        Update: {
          amplify_project_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          criteria_key?: string
          id?: string
          last_evaluated_at?: string | null
          manual_data?: Json | null
          stage_key?: string | null
          status?: string
          system_evidence?: Json | null
          system_key?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_criteria_state_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_criteria_state_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      business_document_departments: {
        Row: {
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          document_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          department: Database["public"]["Enums"]["department"]
          document_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          department?: Database["public"]["Enums"]["department"]
          document_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_document_departments_document_id_fkey"
            columns: ["document_id"]
            referencedRelation: "business_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      business_document_members: {
        Row: {
          created_at: string | null
          document_id: string
          id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          document_id: string
          id?: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          document_id?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_document_members_document_id_fkey"
            columns: ["document_id"]
            referencedRelation: "business_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_document_members_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_documents: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by: string
          expiry_date: string | null
          folder_id: string | null
          id: string
          name: string
          size: number | null
          start_date: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          url: string | null
          visibility_type: Database["public"]["Enums"]["visibility_type"]
          workplace_id: string
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by: string
          expiry_date?: string | null
          folder_id?: string | null
          id?: string
          name: string
          size?: number | null
          start_date?: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          url?: string | null
          visibility_type?: Database["public"]["Enums"]["visibility_type"]
          workplace_id: string
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by?: string
          expiry_date?: string | null
          folder_id?: string | null
          id?: string
          name?: string
          size?: number | null
          start_date?: string | null
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          url?: string | null
          visibility_type?: Database["public"]["Enums"]["visibility_type"]
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_documents_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_documents_folder_id_fkey"
            columns: ["folder_id"]
            referencedRelation: "business_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_documents_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      classification_requests: {
        Row: {
          admin_comment: string | null
          created_at: string | null
          description: string | null
          evidence_urls: string[] | null
          id: string
          name: string
          processed_at: string | null
          processed_by: string | null
          status: string
          submitted_by: string | null
          type: string
          workplace_id: string | null
        }
        Insert: {
          admin_comment?: string | null
          created_at?: string | null
          description?: string | null
          evidence_urls?: string[] | null
          id?: string
          name: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          submitted_by?: string | null
          type: string
          workplace_id?: string | null
        }
        Update: {
          admin_comment?: string | null
          created_at?: string | null
          description?: string | null
          evidence_urls?: string[] | null
          id?: string
          name?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          submitted_by?: string | null
          type?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classification_requests_processed_by_fkey"
            columns: ["processed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_requests_submitted_by_fkey"
            columns: ["submitted_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_requests_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_logs: {
        Row: {
          contact_id: string | null
          content: string | null
          created_at: string | null
          created_by: string
          id: string
          reference_id: string | null
          reference_type: string | null
          sent_at: string | null
          status: string
          subject: string | null
          type: string
          workplace_id: string
        }
        Insert: {
          contact_id?: string | null
          content?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          sent_at?: string | null
          status: string
          subject?: string | null
          type: string
          workplace_id: string
        }
        Update: {
          contact_id?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_logs_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_logs_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assigned_to: string | null
          due_date: string | null
          id: string
          jri_support_requested: boolean | null
          jri_support_requested_at: string | null
          jri_support_requested_by: string | null
          metadata: Json | null
          priority: string | null
          rule_id: string | null
          status: string | null
          support_ticket_id: string | null
          workplace_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to?: string | null
          due_date?: string | null
          id?: string
          jri_support_requested?: boolean | null
          jri_support_requested_at?: string | null
          jri_support_requested_by?: string | null
          metadata?: Json | null
          priority?: string | null
          rule_id?: string | null
          status?: string | null
          support_ticket_id?: string | null
          workplace_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to?: string | null
          due_date?: string | null
          id?: string
          jri_support_requested?: boolean | null
          jri_support_requested_at?: string | null
          jri_support_requested_by?: string | null
          metadata?: Json | null
          priority?: string | null
          rule_id?: string | null
          status?: string | null
          support_ticket_id?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_assignments_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_assignments_jri_support_requested_by_fkey"
            columns: ["jri_support_requested_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_assignments_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_assignments_support_ticket_id_fkey"
            columns: ["support_ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_assignments_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_documents: {
        Row: {
          description: string | null
          document_type: string
          id: string
          metadata: Json | null
          name: string
          rule_id: string | null
          status: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          url: string
          version: number | null
          workplace_id: string | null
        }
        Insert: {
          description?: string | null
          document_type: string
          id?: string
          metadata?: Json | null
          name: string
          rule_id?: string | null
          status?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          url: string
          version?: number | null
          workplace_id?: string | null
        }
        Update: {
          description?: string | null
          document_type?: string
          id?: string
          metadata?: Json | null
          name?: string
          rule_id?: string | null
          status?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          url?: string
          version?: number | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_documents_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_due_config_proposals: {
        Row: {
          confidence: string | null
          created_at: string
          derivation_note: string | null
          proposed_config: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          rule_id: string
          sample_next_dates: Json | null
          status: string
        }
        Insert: {
          confidence?: string | null
          created_at?: string
          derivation_note?: string | null
          proposed_config?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rule_id: string
          sample_next_dates?: Json | null
          status?: string
        }
        Update: {
          confidence?: string | null
          created_at?: string
          derivation_note?: string | null
          proposed_config?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rule_id?: string
          sample_next_dates?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_due_config_proposals_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_evidence: {
        Row: {
          evidence_type: string
          evidence_url: string | null
          id: string
          metadata: Json | null
          rule_id: string | null
          status: string | null
          submitted_at: string | null
          submitted_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          workplace_id: string | null
        }
        Insert: {
          evidence_type: string
          evidence_url?: string | null
          id?: string
          metadata?: Json | null
          rule_id?: string | null
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
          workplace_id?: string | null
        }
        Update: {
          evidence_type?: string
          evidence_url?: string | null
          id?: string
          metadata?: Json | null
          rule_id?: string | null
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_evidence_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_evidence_submitted_by_fkey"
            columns: ["submitted_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_evidence_verified_by_fkey"
            columns: ["verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_evidence_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_instance_documents: {
        Row: {
          business_document_id: string
          created_at: string
          created_by: string | null
          id: string
          instance_id: string
          metadata: Json
          requirement_key: string | null
          status: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          business_document_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          instance_id: string
          metadata?: Json
          requirement_key?: string | null
          status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          business_document_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          instance_id?: string
          metadata?: Json
          requirement_key?: string | null
          status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_instance_documents_business_document_id_fkey"
            columns: ["business_document_id"]
            referencedRelation: "business_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_documents_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_documents_instance_id_fkey"
            columns: ["instance_id"]
            referencedRelation: "compliance_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_documents_verified_by_fkey"
            columns: ["verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_instance_reminders: {
        Row: {
          created_at: string
          id: string
          instance_id: string
          lead_days: number
          notification_id: string | null
          profile_id: string
          sent_at: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          instance_id: string
          lead_days: number
          notification_id?: string | null
          profile_id: string
          sent_at?: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          instance_id?: string
          lead_days?: number
          notification_id?: string | null
          profile_id?: string
          sent_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_instance_reminders_instance_id_fkey"
            columns: ["instance_id"]
            referencedRelation: "compliance_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_reminders_notification_id_fkey"
            columns: ["notification_id"]
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_reminders_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instance_reminders_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_instances: {
        Row: {
          assignment_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          dependency_status: string
          due_date: string | null
          frequency: string
          id: string
          match_snapshot: Json
          matched_via: string
          metadata: Json
          parent_instance_id: string | null
          period_end: string | null
          period_label: string
          period_start: string | null
          priority: string
          rule_id: string
          source_module: string | null
          source_record_id: string | null
          status: string
          support_ticket_id: string | null
          updated_at: string
          vault_folder_id: string | null
          verified_at: string | null
          verified_by: string | null
          workplace_id: string
        }
        Insert: {
          assignment_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dependency_status?: string
          due_date?: string | null
          frequency?: string
          id?: string
          match_snapshot?: Json
          matched_via?: string
          metadata?: Json
          parent_instance_id?: string | null
          period_end?: string | null
          period_label: string
          period_start?: string | null
          priority?: string
          rule_id: string
          source_module?: string | null
          source_record_id?: string | null
          status?: string
          support_ticket_id?: string | null
          updated_at?: string
          vault_folder_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
          workplace_id: string
        }
        Update: {
          assignment_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dependency_status?: string
          due_date?: string | null
          frequency?: string
          id?: string
          match_snapshot?: Json
          matched_via?: string
          metadata?: Json
          parent_instance_id?: string | null
          period_end?: string | null
          period_label?: string
          period_start?: string | null
          priority?: string
          rule_id?: string
          source_module?: string | null
          source_record_id?: string | null
          status?: string
          support_ticket_id?: string | null
          updated_at?: string
          vault_folder_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_instances_assignment_id_fkey"
            columns: ["assignment_id"]
            referencedRelation: "compliance_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_parent_instance_id_fkey"
            columns: ["parent_instance_id"]
            referencedRelation: "compliance_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_support_ticket_id_fkey"
            columns: ["support_ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_vault_folder_id_fkey"
            columns: ["vault_folder_id"]
            referencedRelation: "business_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_verified_by_fkey"
            columns: ["verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_instances_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_rules: {
        Row: {
          assignment_config: Json | null
          assignment_policy: Json
          bucket_link: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          document_requirements: Json | null
          due_config: Json | null
          due_date_logic: string
          evidence_requirements: Json | null
          extended_metadata: Json | null
          id: string
          is_active: boolean | null
          is_service_based: boolean | null
          last_verified_at: string | null
          last_verified_by: string | null
          lifecycle: string | null
          metadata: Json | null
          name: string
          obligation_type: string
          parent_rule_id: string | null
          penalty_config: Json | null
          periodicity: string
          schedule_config: Json | null
          source_type: string
          source_url: string | null
          specific_date: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
          vault_config: Json | null
          vault_folder_template: Json
          verified_by: string | null
          version: number | null
        }
        Insert: {
          assignment_config?: Json | null
          assignment_policy?: Json
          bucket_link?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_requirements?: Json | null
          due_config?: Json | null
          due_date_logic: string
          evidence_requirements?: Json | null
          extended_metadata?: Json | null
          id?: string
          is_active?: boolean | null
          is_service_based?: boolean | null
          last_verified_at?: string | null
          last_verified_by?: string | null
          lifecycle?: string | null
          metadata?: Json | null
          name: string
          obligation_type?: string
          parent_rule_id?: string | null
          penalty_config?: Json | null
          periodicity: string
          schedule_config?: Json | null
          source_type: string
          source_url?: string | null
          specific_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vault_config?: Json | null
          vault_folder_template?: Json
          verified_by?: string | null
          version?: number | null
        }
        Update: {
          assignment_config?: Json | null
          assignment_policy?: Json
          bucket_link?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_requirements?: Json | null
          due_config?: Json | null
          due_date_logic?: string
          evidence_requirements?: Json | null
          extended_metadata?: Json | null
          id?: string
          is_active?: boolean | null
          is_service_based?: boolean | null
          last_verified_at?: string | null
          last_verified_by?: string | null
          lifecycle?: string | null
          metadata?: Json | null
          name?: string
          obligation_type?: string
          parent_rule_id?: string | null
          penalty_config?: Json | null
          periodicity?: string
          schedule_config?: Json | null
          source_type?: string
          source_url?: string | null
          specific_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vault_config?: Json | null
          vault_folder_template?: Json
          verified_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_rules_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_rules_last_verified_by_fkey"
            columns: ["last_verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_rules_parent_rule_id_fkey"
            columns: ["parent_rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_rules_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_schedules: {
        Row: {
          created_at: string | null
          created_by: string | null
          frequency: string
          id: string
          last_completed_at: string | null
          metadata: Json | null
          next_due_date: string
          rule_id: string | null
          status: string | null
          workplace_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          frequency: string
          id?: string
          last_completed_at?: string | null
          metadata?: Json | null
          next_due_date: string
          rule_id?: string | null
          status?: string | null
          workplace_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          frequency?: string
          id?: string
          last_completed_at?: string | null
          metadata?: Json | null
          next_due_date?: string
          rule_id?: string | null
          status?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_schedules_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_schedules_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_schedules_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_sweep_runs: {
        Row: {
          coverage_issues: Json
          due_soon_unassigned: number
          errors: Json
          finished_at: string | null
          id: string
          instances_created: number
          needs_input_open: number
          overdue_notified: number
          reminders_sent: number
          started_at: string
          stuck_dependencies: number
          workplaces_processed: number
          zero_match_workplaces: number
        }
        Insert: {
          coverage_issues?: Json
          due_soon_unassigned?: number
          errors?: Json
          finished_at?: string | null
          id?: string
          instances_created?: number
          needs_input_open?: number
          overdue_notified?: number
          reminders_sent?: number
          started_at?: string
          stuck_dependencies?: number
          workplaces_processed?: number
          zero_match_workplaces?: number
        }
        Update: {
          coverage_issues?: Json
          due_soon_unassigned?: number
          errors?: Json
          finished_at?: string | null
          id?: string
          instances_created?: number
          needs_input_open?: number
          overdue_notified?: number
          reminders_sent?: number
          started_at?: string
          stuck_dependencies?: number
          workplaces_processed?: number
          zero_match_workplaces?: number
        }
        Relationships: []
      }
      compliance_verifications: {
        Row: {
          evidence_ids: string[] | null
          id: string
          metadata: Json | null
          notes: string | null
          rule_id: string | null
          status: string
          verified_at: string | null
          verified_by: string | null
          workplace_id: string | null
        }
        Insert: {
          evidence_ids?: string[] | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          rule_id?: string | null
          status: string
          verified_at?: string | null
          verified_by?: string | null
          workplace_id?: string | null
        }
        Update: {
          evidence_ids?: string[] | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          rule_id?: string | null
          status?: string
          verified_at?: string | null
          verified_by?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_verifications_verified_by_fkey"
            columns: ["verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_verifications_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_tool_audit: {
        Row: {
          app_slug: string | null
          args_summary: string | null
          connection_id: string | null
          created_at: string
          id: string
          status: string | null
          tool: string
          workplace_id: string
        }
        Insert: {
          app_slug?: string | null
          args_summary?: string | null
          connection_id?: string | null
          created_at?: string
          id?: string
          status?: string | null
          tool: string
          workplace_id: string
        }
        Update: {
          app_slug?: string | null
          args_summary?: string | null
          connection_id?: string | null
          created_at?: string
          id?: string
          status?: string | null
          tool?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_tool_audit_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "workplace_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connection_tool_audit_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_access_log: {
        Row: {
          action: string
          consultant_profile_id: string | null
          created_at: string
          id: number
          report_key: string | null
          snapshot_id: string | null
          workplace_consultant_id: string | null
          workplace_id: string
        }
        Insert: {
          action: string
          consultant_profile_id?: string | null
          created_at?: string
          id?: number
          report_key?: string | null
          snapshot_id?: string | null
          workplace_consultant_id?: string | null
          workplace_id: string
        }
        Update: {
          action?: string
          consultant_profile_id?: string | null
          created_at?: string
          id?: number
          report_key?: string | null
          snapshot_id?: string | null
          workplace_consultant_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_access_log_consultant_profile_id_fkey"
            columns: ["consultant_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_access_log_workplace_consultant_id_fkey"
            columns: ["workplace_consultant_id"]
            referencedRelation: "workplace_consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_access_log_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_ai_usage: {
        Row: {
          action: string
          calls: number
          profile_id: string
          used_on: string
        }
        Insert: {
          action: string
          calls?: number
          profile_id: string
          used_on?: string
        }
        Update: {
          action?: string
          calls?: number
          profile_id?: string
          used_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_ai_usage_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_automation_log: {
        Row: {
          created_at: string
          detail: Json
          id: number
          job: string
          occurred_on: string
          subject_id: string
          workplace_id: string | null
        }
        Insert: {
          created_at?: string
          detail?: Json
          id?: number
          job: string
          occurred_on: string
          subject_id: string
          workplace_id?: string | null
        }
        Update: {
          created_at?: string
          detail?: Json
          id?: number
          job?: string
          occurred_on?: string
          subject_id?: string
          workplace_id?: string | null
        }
        Relationships: []
      }
      consultant_client_files: {
        Row: {
          client_id: string
          created_at: string
          id: string
          mime_type: string | null
          size_bytes: number | null
          storage_path: string
          title: string
          uploaded_by: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path: string
          title: string
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string
          title?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultant_client_files_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "consultant_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_client_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_client_reminders: {
        Row: {
          catalogue_key: string | null
          channel: string
          client_id: string
          created_at: string
          due_date: string
          id: string
          note: string | null
          period_label: string | null
          queued_message_id: number | null
          sent_at: string | null
          status: string
          title: string
        }
        Insert: {
          catalogue_key?: string | null
          channel?: string
          client_id: string
          created_at?: string
          due_date: string
          id?: string
          note?: string | null
          period_label?: string | null
          queued_message_id?: number | null
          sent_at?: string | null
          status?: string
          title: string
        }
        Update: {
          catalogue_key?: string | null
          channel?: string
          client_id?: string
          created_at?: string
          due_date?: string
          id?: string
          note?: string | null
          period_label?: string | null
          queued_message_id?: number | null
          sent_at?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_client_reminders_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "consultant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_clients: {
        Row: {
          city: string | null
          contact_name: string | null
          converted_at: string | null
          converted_workplace_id: string | null
          created_at: string
          email: string | null
          entity_type: string | null
          firm_id: string | null
          gstin: string | null
          id: string
          name: string
          notes: string | null
          owner_profile_id: string
          pan: string | null
          phone_e164: string | null
          state: string | null
          status: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          contact_name?: string | null
          converted_at?: string | null
          converted_workplace_id?: string | null
          created_at?: string
          email?: string | null
          entity_type?: string | null
          firm_id?: string | null
          gstin?: string | null
          id?: string
          name: string
          notes?: string | null
          owner_profile_id: string
          pan?: string | null
          phone_e164?: string | null
          state?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          contact_name?: string | null
          converted_at?: string | null
          converted_workplace_id?: string | null
          created_at?: string
          email?: string | null
          entity_type?: string | null
          firm_id?: string | null
          gstin?: string | null
          id?: string
          name?: string
          notes?: string | null
          owner_profile_id?: string
          pan?: string | null
          phone_e164?: string | null
          state?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_clients_converted_workplace_id_fkey"
            columns: ["converted_workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_clients_firm_id_fkey"
            columns: ["firm_id"]
            referencedRelation: "consultant_firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_clients_owner_profile_id_fkey"
            columns: ["owner_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_document_requests: {
        Row: {
          document_path: string | null
          due_date: string | null
          fulfilled_at: string | null
          fulfilled_by: string | null
          id: string
          note: string | null
          requested_at: string
          requested_by: string
          status: string
          title: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Insert: {
          document_path?: string | null
          due_date?: string | null
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          note?: string | null
          requested_at?: string
          requested_by: string
          status?: string
          title: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Update: {
          document_path?: string | null
          due_date?: string | null
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          note?: string | null
          requested_at?: string
          requested_by?: string
          status?: string
          title?: string
          workplace_consultant_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_document_requests_fulfilled_by_fkey"
            columns: ["fulfilled_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_document_requests_requested_by_fkey"
            columns: ["requested_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_document_requests_workplace_consultant_id_fkey"
            columns: ["workplace_consultant_id"]
            referencedRelation: "workplace_consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_document_requests_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_filings: {
        Row: {
          acknowledgement_ref: string | null
          compliance_instance_id: string | null
          evidence_path: string | null
          filed_at: string
          filed_by: string
          id: string
          notes: string | null
          period_label: string | null
          title: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Insert: {
          acknowledgement_ref?: string | null
          compliance_instance_id?: string | null
          evidence_path?: string | null
          filed_at?: string
          filed_by: string
          id?: string
          notes?: string | null
          period_label?: string | null
          title: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Update: {
          acknowledgement_ref?: string | null
          compliance_instance_id?: string | null
          evidence_path?: string | null
          filed_at?: string
          filed_by?: string
          id?: string
          notes?: string | null
          period_label?: string | null
          title?: string
          workplace_consultant_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_filings_compliance_instance_id_fkey"
            columns: ["compliance_instance_id"]
            referencedRelation: "compliance_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_filings_filed_by_fkey"
            columns: ["filed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_filings_workplace_consultant_id_fkey"
            columns: ["workplace_consultant_id"]
            referencedRelation: "workplace_consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_filings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_firm_members: {
        Row: {
          added_at: string
          firm_id: string
          profile_id: string
          role: string
        }
        Insert: {
          added_at?: string
          firm_id: string
          profile_id: string
          role?: string
        }
        Update: {
          added_at?: string
          firm_id?: string
          profile_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_firm_members_firm_id_fkey"
            columns: ["firm_id"]
            referencedRelation: "consultant_firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_firm_members_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_firms: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          owner_profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          owner_profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          owner_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_firms_owner_profile_id_fkey"
            columns: ["owner_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_messages: {
        Row: {
          author_profile_id: string
          body: string
          created_at: string
          id: number
          thread_id: string
        }
        Insert: {
          author_profile_id: string
          body: string
          created_at?: string
          id?: number
          thread_id: string
        }
        Update: {
          author_profile_id?: string
          body?: string
          created_at?: string
          id?: number
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_messages_author_profile_id_fkey"
            columns: ["author_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_messages_thread_id_fkey"
            columns: ["thread_id"]
            referencedRelation: "consultant_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_obligation_catalogue: {
        Row: {
          active: boolean
          applies_when: string[]
          authority: string
          due_day: number
          due_month: number | null
          due_year_offset: number
          key: string
          label: string
          note: string | null
          period_suffix: string | null
          rule: string
        }
        Insert: {
          active?: boolean
          applies_when?: string[]
          authority: string
          due_day: number
          due_month?: number | null
          due_year_offset?: number
          key: string
          label: string
          note?: string | null
          period_suffix?: string | null
          rule: string
        }
        Update: {
          active?: boolean
          applies_when?: string[]
          authority?: string
          due_day?: number
          due_month?: number | null
          due_year_offset?: number
          key?: string
          label?: string
          note?: string | null
          period_suffix?: string | null
          rule?: string
        }
        Relationships: []
      }
      consultant_payment_details: {
        Row: {
          bank_account_name: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          firm_id: string | null
          owner_profile_id: string
          payment_note: string | null
          updated_at: string
          upi_id: string | null
        }
        Insert: {
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          firm_id?: string | null
          owner_profile_id: string
          payment_note?: string | null
          updated_at?: string
          upi_id?: string | null
        }
        Update: {
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          firm_id?: string | null
          owner_profile_id?: string
          payment_note?: string | null
          updated_at?: string
          upi_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultant_payment_details_firm_id_fkey"
            columns: ["firm_id"]
            referencedRelation: "consultant_firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_payment_details_owner_profile_id_fkey"
            columns: ["owner_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_report_grants: {
        Row: {
          expires_at: string | null
          financial_year: string | null
          granted_at: string
          granted_by: string
          id: string
          report_key: string
          revoked: boolean
          workplace_consultant_id: string
        }
        Insert: {
          expires_at?: string | null
          financial_year?: string | null
          granted_at?: string
          granted_by: string
          id?: string
          report_key: string
          revoked?: boolean
          workplace_consultant_id: string
        }
        Update: {
          expires_at?: string | null
          financial_year?: string | null
          granted_at?: string
          granted_by?: string
          id?: string
          report_key?: string
          revoked?: boolean
          workplace_consultant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_report_grants_granted_by_fkey"
            columns: ["granted_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_report_grants_workplace_consultant_id_fkey"
            columns: ["workplace_consultant_id"]
            referencedRelation: "workplace_consultants"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_threads: {
        Row: {
          closed: boolean
          context_key: string | null
          context_type: string
          created_at: string
          created_by: string
          id: string
          last_message_at: string
          subject: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Insert: {
          closed?: boolean
          context_key?: string | null
          context_type?: string
          created_at?: string
          created_by: string
          id?: string
          last_message_at?: string
          subject: string
          workplace_consultant_id: string
          workplace_id: string
        }
        Update: {
          closed?: boolean
          context_key?: string | null
          context_type?: string
          created_at?: string
          created_by?: string
          id?: string
          last_message_at?: string
          subject?: string
          workplace_consultant_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_threads_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_threads_workplace_consultant_id_fkey"
            columns: ["workplace_consultant_id"]
            referencedRelation: "workplace_consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_threads_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_connections: {
        Row: {
          bsp_name: string | null
          bsp_reference: string | null
          business_account_id: string | null
          connected_at: string
          connected_by: string
          consultant_profile_id: string | null
          display_name: string | null
          firm_id: string | null
          id: string
          last_error: string | null
          last_used_at: string | null
          phone_e164: string | null
          phone_number_id: string | null
          provider: string
          secret_encrypted: string | null
          status: string
        }
        Insert: {
          bsp_name?: string | null
          bsp_reference?: string | null
          business_account_id?: string | null
          connected_at?: string
          connected_by: string
          consultant_profile_id?: string | null
          display_name?: string | null
          firm_id?: string | null
          id?: string
          last_error?: string | null
          last_used_at?: string | null
          phone_e164?: string | null
          phone_number_id?: string | null
          provider?: string
          secret_encrypted?: string | null
          status?: string
        }
        Update: {
          bsp_name?: string | null
          bsp_reference?: string | null
          business_account_id?: string | null
          connected_at?: string
          connected_by?: string
          consultant_profile_id?: string | null
          display_name?: string | null
          firm_id?: string | null
          id?: string
          last_error?: string | null
          last_used_at?: string | null
          phone_e164?: string | null
          phone_number_id?: string | null
          provider?: string
          secret_encrypted?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_connections_connected_by_fkey"
            columns: ["connected_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_connections_consultant_profile_id_fkey"
            columns: ["consultant_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_connections_firm_id_fkey"
            columns: ["firm_id"]
            referencedRelation: "consultant_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_delivery: {
        Row: {
          connection_id: string | null
          delivered_at: string | null
          error: string | null
          failed_at: string | null
          message_id: number | null
          provider_message_id: string
          read_at: string | null
          sent_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          connection_id?: string | null
          delivered_at?: string | null
          error?: string | null
          failed_at?: string | null
          message_id?: number | null
          provider_message_id: string
          read_at?: string | null
          sent_at?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          connection_id?: string | null
          delivered_at?: string | null
          error?: string | null
          failed_at?: string | null
          message_id?: number | null
          provider_message_id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_delivery_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "consultant_whatsapp_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_delivery_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "consultant_whatsapp_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_inbound: {
        Row: {
          body: string | null
          created_at: string
          from_phone: string
          id: number
          media_id: string | null
          media_mime: string | null
          message_type: string
          provider_message_id: string | null
          raw: Json | null
          received_at: string
          thread_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          from_phone: string
          id?: number
          media_id?: string | null
          media_mime?: string | null
          message_type: string
          provider_message_id?: string | null
          raw?: Json | null
          received_at: string
          thread_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          from_phone?: string
          id?: number
          media_id?: string | null
          media_mime?: string | null
          message_type?: string
          provider_message_id?: string | null
          raw?: Json | null
          received_at?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_inbound_thread_id_fkey"
            columns: ["thread_id"]
            referencedRelation: "consultant_whatsapp_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_messages: {
        Row: {
          body_preview: string | null
          connection_id: string
          created_at: string
          error: string | null
          id: number
          params: string[] | null
          phone_e164: string
          provider_message_id: string | null
          purpose: string | null
          sent_by: string | null
          status: string
          template_name: string | null
          workplace_id: string | null
        }
        Insert: {
          body_preview?: string | null
          connection_id: string
          created_at?: string
          error?: string | null
          id?: number
          params?: string[] | null
          phone_e164: string
          provider_message_id?: string | null
          purpose?: string | null
          sent_by?: string | null
          status?: string
          template_name?: string | null
          workplace_id?: string | null
        }
        Update: {
          body_preview?: string | null
          connection_id?: string
          created_at?: string
          error?: string | null
          id?: number
          params?: string[] | null
          phone_e164?: string
          provider_message_id?: string | null
          purpose?: string | null
          sent_by?: string | null
          status?: string
          template_name?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_messages_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "consultant_whatsapp_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_messages_sent_by_fkey"
            columns: ["sent_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_messages_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_optins: {
        Row: {
          connection_id: string
          display_name: string | null
          id: string
          opted_in_at: string
          opted_out_at: string | null
          phone_e164: string
          source: string
          workplace_id: string | null
        }
        Insert: {
          connection_id: string
          display_name?: string | null
          id?: string
          opted_in_at?: string
          opted_out_at?: string | null
          phone_e164: string
          source?: string
          workplace_id?: string | null
        }
        Update: {
          connection_id?: string
          display_name?: string | null
          id?: string
          opted_in_at?: string
          opted_out_at?: string | null
          phone_e164?: string
          source?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_optins_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "consultant_whatsapp_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_optins_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_templates: {
        Row: {
          approved: boolean
          body_preview: string | null
          connection_id: string
          created_at: string
          id: string
          language_code: string
          purpose: string
          template_name: string
        }
        Insert: {
          approved?: boolean
          body_preview?: string | null
          connection_id: string
          created_at?: string
          id?: string
          language_code?: string
          purpose: string
          template_name: string
        }
        Update: {
          approved?: boolean
          body_preview?: string | null
          connection_id?: string
          created_at?: string
          id?: string
          language_code?: string
          purpose?: string
          template_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_templates_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "consultant_whatsapp_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      consultant_whatsapp_threads: {
        Row: {
          client_id: string | null
          connection_id: string
          created_at: string
          display_name: string | null
          id: string
          last_inbound_at: string | null
          last_message_at: string | null
          phone_e164: string
          status: string
          unread_count: number
          workplace_id: string | null
        }
        Insert: {
          client_id?: string | null
          connection_id: string
          created_at?: string
          display_name?: string | null
          id?: string
          last_inbound_at?: string | null
          last_message_at?: string | null
          phone_e164: string
          status?: string
          unread_count?: number
          workplace_id?: string | null
        }
        Update: {
          client_id?: string | null
          connection_id?: string
          created_at?: string
          display_name?: string | null
          id?: string
          last_inbound_at?: string | null
          last_message_at?: string | null
          phone_e164?: string
          status?: string
          unread_count?: number
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultant_whatsapp_threads_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "consultant_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_threads_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "consultant_whatsapp_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_whatsapp_threads_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          billing_address: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          created_by: string
          credit_limit: number | null
          currency: string | null
          emails: string[] | null
          gstin: string | null
          higher_tds_rate: boolean | null
          id: string
          is_loyalty_member: boolean | null
          lower_deduction_certificate: Json | null
          loyalty_joined_at: string | null
          loyalty_points: number
          loyalty_tier: string | null
          metadata: Json | null
          name: string
          notes: string | null
          pan: string | null
          pan_verified: boolean | null
          payment_terms: number | null
          phones: string[] | null
          pincode: string | null
          shipping_address: string | null
          state: string | null
          state_code: string | null
          tags: string[] | null
          tax_treatment: string | null
          tcs_applicable: boolean | null
          tds_applicable: boolean | null
          tds_category: string | null
          tds_default_section: string | null
          type: Database["public"]["Enums"]["contact_type"]
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          created_by: string
          credit_limit?: number | null
          currency?: string | null
          emails?: string[] | null
          gstin?: string | null
          higher_tds_rate?: boolean | null
          id?: string
          is_loyalty_member?: boolean | null
          lower_deduction_certificate?: Json | null
          loyalty_joined_at?: string | null
          loyalty_points?: number
          loyalty_tier?: string | null
          metadata?: Json | null
          name: string
          notes?: string | null
          pan?: string | null
          pan_verified?: boolean | null
          payment_terms?: number | null
          phones?: string[] | null
          pincode?: string | null
          shipping_address?: string | null
          state?: string | null
          state_code?: string | null
          tags?: string[] | null
          tax_treatment?: string | null
          tcs_applicable?: boolean | null
          tds_applicable?: boolean | null
          tds_category?: string | null
          tds_default_section?: string | null
          type?: Database["public"]["Enums"]["contact_type"]
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string
          credit_limit?: number | null
          currency?: string | null
          emails?: string[] | null
          gstin?: string | null
          higher_tds_rate?: boolean | null
          id?: string
          is_loyalty_member?: boolean | null
          lower_deduction_certificate?: Json | null
          loyalty_joined_at?: string | null
          loyalty_points?: number
          loyalty_tier?: string | null
          metadata?: Json | null
          name?: string
          notes?: string | null
          pan?: string | null
          pan_verified?: boolean | null
          payment_terms?: number | null
          phones?: string[] | null
          pincode?: string | null
          shipping_address?: string | null
          state?: string | null
          state_code?: string | null
          tags?: string[] | null
          tax_treatment?: string | null
          tcs_applicable?: boolean | null
          tds_applicable?: boolean | null
          tds_category?: string | null
          tds_default_section?: string | null
          type?: Database["public"]["Enums"]["contact_type"]
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analyses: {
        Row: {
          ai_provider: string
          analysis_type: Database["public"]["Enums"]["contract_analysis_type"]
          content: Json
          contract_id: string
          created_at: string | null
          id: string
          risk_level: string | null
          score: number | null
          summary: Json | null
        }
        Insert: {
          ai_provider: string
          analysis_type: Database["public"]["Enums"]["contract_analysis_type"]
          content?: Json
          contract_id: string
          created_at?: string | null
          id?: string
          risk_level?: string | null
          score?: number | null
          summary?: Json | null
        }
        Update: {
          ai_provider?: string
          analysis_type?: Database["public"]["Enums"]["contract_analysis_type"]
          content?: Json
          contract_id?: string
          created_at?: string | null
          id?: string
          risk_level?: string | null
          score?: number | null
          summary?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analyses_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analysis_comments: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          section_id: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          section_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          section_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analysis_comments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_analysis_comments_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "contract_analysis_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analysis_results: {
        Row: {
          analysis_type: Database["public"]["Enums"]["contract_analysis_type"]
          contract_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          metadata: Json | null
          risk_level: string | null
          score: number | null
          summary: Json | null
          updated_at: string | null
        }
        Insert: {
          analysis_type: Database["public"]["Enums"]["contract_analysis_type"]
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          risk_level?: string | null
          score?: number | null
          summary?: Json | null
          updated_at?: string | null
        }
        Update: {
          analysis_type?: Database["public"]["Enums"]["contract_analysis_type"]
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          risk_level?: string | null
          score?: number | null
          summary?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analysis_results_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_analysis_results_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analysis_sections: {
        Row: {
          analysis_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          priority: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          analysis_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          priority?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          analysis_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          priority?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analysis_sections_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "contract_analysis_results"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_clause_comments: {
        Row: {
          clause_id: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          updated_at: string
        }
        Insert: {
          clause_id: string
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string
        }
        Update: {
          clause_id?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_clause_comments_clause_id_fkey"
            columns: ["clause_id"]
            referencedRelation: "contract_clauses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_clause_comments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_clause_comments_resolved_by_fkey"
            columns: ["resolved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_clauses: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          order_position: number
          section_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          order_position: number
          section_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          order_position?: number
          section_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_clauses_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "contract_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_sections: {
        Row: {
          content: string | null
          created_at: string | null
          edit_contract_id: string
          id: string
          order_position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          edit_contract_id: string
          id?: string
          order_position: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          edit_contract_id?: string
          id?: string
          order_position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_sections_contract_fk"
            columns: ["edit_contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_signatories: {
        Row: {
          contract_id: string
          created_at: string | null
          email: string
          failed_otp_attempts: number | null
          id: string
          ip_address: string | null
          last_reminder_sent: string | null
          name: string
          order: number
          otp: string | null
          otp_expires_at: string | null
          reminder_count: number | null
          signature_image_url: string | null
          signature_metadata: Json | null
          signature_type: string | null
          signed_at: string | null
          signed_file_url: string | null
          status: string | null
          user_agent: string | null
        }
        Insert: {
          contract_id: string
          created_at?: string | null
          email: string
          failed_otp_attempts?: number | null
          id?: string
          ip_address?: string | null
          last_reminder_sent?: string | null
          name: string
          order: number
          otp?: string | null
          otp_expires_at?: string | null
          reminder_count?: number | null
          signature_image_url?: string | null
          signature_metadata?: Json | null
          signature_type?: string | null
          signed_at?: string | null
          signed_file_url?: string | null
          status?: string | null
          user_agent?: string | null
        }
        Update: {
          contract_id?: string
          created_at?: string | null
          email?: string
          failed_otp_attempts?: number | null
          id?: string
          ip_address?: string | null
          last_reminder_sent?: string | null
          name?: string
          order?: number
          otp?: string | null
          otp_expires_at?: string | null
          reminder_count?: number | null
          signature_image_url?: string | null
          signature_metadata?: Json | null
          signature_type?: string | null
          signed_at?: string | null
          signed_file_url?: string | null
          status?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_signatories_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_workplaces: {
        Row: {
          added_at: string
          added_by: string | null
          contract_id: string
          id: string
          role: string
          workplace_id: string
        }
        Insert: {
          added_at?: string
          added_by?: string | null
          contract_id: string
          id?: string
          role: string
          workplace_id: string
        }
        Update: {
          added_at?: string
          added_by?: string | null
          contract_id?: string
          id?: string
          role?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_workplaces_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_workplaces_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          content_hash: string | null
          created_at: string | null
          created_by: string
          description: string | null
          generated_pdf_metadata: Json | null
          generated_pdf_url: string | null
          id: string
          last_pdf_generated_at: string | null
          markdown_content: string | null
          metadata: Json | null
          original_file_metadata: Json | null
          original_file_url: string | null
          pdf_file_size: number | null
          pdf_generated_at: string | null
          pdf_generation_status: string | null
          pdf_page_count: number | null
          search_vector: unknown
          status: Database["public"]["Enums"]["contract_status"] | null
          title: string
          updated_at: string | null
          version: number | null
          workplace_id: string
        }
        Insert: {
          content_hash?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          generated_pdf_metadata?: Json | null
          generated_pdf_url?: string | null
          id?: string
          last_pdf_generated_at?: string | null
          markdown_content?: string | null
          metadata?: Json | null
          original_file_metadata?: Json | null
          original_file_url?: string | null
          pdf_file_size?: number | null
          pdf_generated_at?: string | null
          pdf_generation_status?: string | null
          pdf_page_count?: number | null
          search_vector?: unknown
          status?: Database["public"]["Enums"]["contract_status"] | null
          title: string
          updated_at?: string | null
          version?: number | null
          workplace_id: string
        }
        Update: {
          content_hash?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          generated_pdf_metadata?: Json | null
          generated_pdf_url?: string | null
          id?: string
          last_pdf_generated_at?: string | null
          markdown_content?: string | null
          metadata?: Json | null
          original_file_metadata?: Json | null
          original_file_url?: string | null
          pdf_file_size?: number | null
          pdf_generated_at?: string | null
          pdf_generation_status?: string | null
          pdf_page_count?: number | null
          search_vector?: unknown
          status?: Database["public"]["Enums"]["contract_status"] | null
          title?: string
          updated_at?: string | null
          version?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_subscriptions: {
        Row: {
          cancellation_date: string | null
          cancellation_reason: string | null
          contact_id: string
          created_at: string
          created_by: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          last_invoice_id: string | null
          metadata: Json
          next_billing_date: string | null
          plan_id: string
          quantity: number
          recurrence_schedule_id: string | null
          start_date: string
          status: string
          unit_amount: number | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          cancellation_date?: string | null
          cancellation_reason?: string | null
          contact_id: string
          created_at?: string
          created_by?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          last_invoice_id?: string | null
          metadata?: Json
          next_billing_date?: string | null
          plan_id: string
          quantity?: number
          recurrence_schedule_id?: string | null
          start_date?: string
          status?: string
          unit_amount?: number | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          cancellation_date?: string | null
          cancellation_reason?: string | null
          contact_id?: string
          created_at?: string
          created_by?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          last_invoice_id?: string | null
          metadata?: Json
          next_billing_date?: string | null
          plan_id?: string
          quantity?: number
          recurrence_schedule_id?: string | null
          start_date?: string
          status?: string
          unit_amount?: number | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_subscriptions_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_last_invoice_id_fkey"
            columns: ["last_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_recurrence_schedule_id_fkey"
            columns: ["recurrence_schedule_id"]
            referencedRelation: "recurrence_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          applies_to: string
          code: string | null
          created_at: string | null
          created_by: string
          end_date: string | null
          id: string
          is_active: boolean
          max_discount_amount: number | null
          min_purchase_amount: number
          name: string
          start_date: string | null
          target_ids: string[] | null
          type: string
          updated_at: string | null
          usage_limit: number | null
          used_count: number
          value: number
          workplace_id: string
        }
        Insert: {
          applies_to?: string
          code?: string | null
          created_at?: string | null
          created_by: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          max_discount_amount?: number | null
          min_purchase_amount?: number
          name: string
          start_date?: string | null
          target_ids?: string[] | null
          type: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number
          value: number
          workplace_id: string
        }
        Update: {
          applies_to?: string
          code?: string | null
          created_at?: string | null
          created_by?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          max_discount_amount?: number | null
          min_purchase_amount?: number
          name?: string
          start_date?: string | null
          target_ids?: string[] | null
          type?: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number
          value?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discounts_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      document_share_tokens: {
        Row: {
          bucket: string
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          object_path: string
          resource_id: string | null
          resource_type: string | null
          revoked: boolean
          token_hash: string
          workplace_id: string | null
        }
        Insert: {
          bucket: string
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          object_path: string
          resource_id?: string | null
          resource_type?: string | null
          revoked?: boolean
          token_hash: string
          workplace_id?: string | null
        }
        Update: {
          bucket?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          object_path?: string
          resource_id?: string | null
          resource_type?: string | null
          revoked?: boolean
          token_hash?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_share_tokens_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      e_invoice_lifecycle_events: {
        Row: {
          acknowledgement_at: string | null
          acknowledgement_number: string | null
          cancellation_reason: string | null
          cancellation_reference: string | null
          created_by: string | null
          effective_at: string
          failure_code: string | null
          failure_message: string | null
          id: string
          idempotency_key: string
          invoice_id: string
          irn: string | null
          lifecycle_event: string
          metadata: Json
          payload_hash: string
          provider_key: string | null
          provider_reference: string | null
          recorded_at: string
          response_hash: string | null
          signed_invoice_path: string | null
          signed_qr_path: string | null
          source_version: number
          workplace_id: string
        }
        Insert: {
          acknowledgement_at?: string | null
          acknowledgement_number?: string | null
          cancellation_reason?: string | null
          cancellation_reference?: string | null
          created_by?: string | null
          effective_at: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          idempotency_key: string
          invoice_id: string
          irn?: string | null
          lifecycle_event: string
          metadata?: Json
          payload_hash: string
          provider_key?: string | null
          provider_reference?: string | null
          recorded_at?: string
          response_hash?: string | null
          signed_invoice_path?: string | null
          signed_qr_path?: string | null
          source_version?: number
          workplace_id: string
        }
        Update: {
          acknowledgement_at?: string | null
          acknowledgement_number?: string | null
          cancellation_reason?: string | null
          cancellation_reference?: string | null
          created_by?: string | null
          effective_at?: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          idempotency_key?: string
          invoice_id?: string
          irn?: string | null
          lifecycle_event?: string
          metadata?: Json
          payload_hash?: string
          provider_key?: string | null
          provider_reference?: string | null
          recorded_at?: string
          response_hash?: string | null
          signed_invoice_path?: string | null
          signed_qr_path?: string | null
          source_version?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "e_invoice_events_invoice_workplace_fkey"
            columns: ["invoice_id", "workplace_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "e_invoice_lifecycle_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "e_invoice_lifecycle_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaign_optouts: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_optouts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          body_html: string
          created_at: string
          created_by_id: string | null
          created_by_type: string
          failed_count: number | null
          id: string
          last_error: string | null
          recipient_count: number | null
          segment: Json
          sent_at: string | null
          sent_count: number | null
          status: string
          subject: string
          task_id: string | null
          test_sent_at: string | null
          test_sent_to: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          body_html: string
          created_at?: string
          created_by_id?: string | null
          created_by_type?: string
          failed_count?: number | null
          id?: string
          last_error?: string | null
          recipient_count?: number | null
          segment?: Json
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject: string
          task_id?: string | null
          test_sent_at?: string | null
          test_sent_to?: string | null
          title: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          body_html?: string
          created_at?: string
          created_by_id?: string | null
          created_by_type?: string
          failed_count?: number | null
          id?: string
          last_error?: string | null
          recipient_count?: number | null
          segment?: Json
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject?: string
          task_id?: string | null
          test_sent_at?: string | null
          test_sent_to?: string | null
          title?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_types: {
        Row: {
          audit_thresholds: Json | null
          created_at: string | null
          created_by: string | null
          default_notifications: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          version: number | null
        }
        Insert: {
          audit_thresholds?: Json | null
          created_at?: string | null
          created_by?: string | null
          default_notifications?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          version?: number | null
        }
        Update: {
          audit_thresholds?: Json | null
          created_at?: string | null
          created_by?: string | null
          default_notifications?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_types_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      eway_bill_queue: {
        Row: {
          created_at: string | null
          distance_km: number | null
          error_message: string | null
          id: string
          invoice_id: string
          status: string
          transporter_id: string | null
          transporter_name: string | null
          updated_at: string | null
          vehicle_no: string | null
        }
        Insert: {
          created_at?: string | null
          distance_km?: number | null
          error_message?: string | null
          id?: string
          invoice_id: string
          status?: string
          transporter_id?: string | null
          transporter_name?: string | null
          updated_at?: string | null
          vehicle_no?: string | null
        }
        Update: {
          created_at?: string | null
          distance_km?: number | null
          error_message?: string | null
          id?: string
          invoice_id?: string
          status?: string
          transporter_id?: string | null
          transporter_name?: string | null
          updated_at?: string | null
          vehicle_no?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eway_bill_queue_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          created_by: string
          date: string
          description: string | null
          gst_amount: number | null
          gst_applicable: boolean | null
          id: string
          location_id: string | null
          metadata: Json | null
          payment_method: string | null
          pos_session_id: string | null
          receipt_url: string | null
          reference: string | null
          tags: string[] | null
          tax_deductible: boolean | null
          tds_amount: number | null
          tds_applicable: boolean | null
          tds_rate: number | null
          tds_section: string | null
          updated_at: string | null
          vendor_id: string | null
          workplace_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          created_by: string
          date?: string
          description?: string | null
          gst_amount?: number | null
          gst_applicable?: boolean | null
          id?: string
          location_id?: string | null
          metadata?: Json | null
          payment_method?: string | null
          pos_session_id?: string | null
          receipt_url?: string | null
          reference?: string | null
          tags?: string[] | null
          tax_deductible?: boolean | null
          tds_amount?: number | null
          tds_applicable?: boolean | null
          tds_rate?: number | null
          tds_section?: string | null
          updated_at?: string | null
          vendor_id?: string | null
          workplace_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          created_by?: string
          date?: string
          description?: string | null
          gst_amount?: number | null
          gst_applicable?: boolean | null
          id?: string
          location_id?: string | null
          metadata?: Json | null
          payment_method?: string | null
          pos_session_id?: string | null
          receipt_url?: string | null
          reference?: string | null
          tags?: string[] | null
          tax_deductible?: boolean | null
          tds_amount?: number | null
          tds_applicable?: boolean | null
          tds_rate?: number | null
          tds_section?: string | null
          updated_at?: string | null
          vendor_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expenses_location_id"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expenses_pos_session_id"
            columns: ["pos_session_id"]
            referencedRelation: "pos_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_asset_events: {
        Row: {
          accounting_event_id: string | null
          accumulated_depreciation_delta: number
          created_by: string | null
          effective_at: string
          event_type: string
          fixed_asset_id: string
          gross_value_delta: number
          id: string
          idempotency_key: string | null
          metadata: Json
          payload_hash: string
          recorded_at: string
          source_id: string
          source_type: string
          source_version: number
          workplace_id: string
        }
        Insert: {
          accounting_event_id?: string | null
          accumulated_depreciation_delta?: number
          created_by?: string | null
          effective_at: string
          event_type: string
          fixed_asset_id: string
          gross_value_delta?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          payload_hash: string
          recorded_at?: string
          source_id: string
          source_type: string
          source_version?: number
          workplace_id: string
        }
        Update: {
          accounting_event_id?: string | null
          accumulated_depreciation_delta?: number
          created_by?: string | null
          effective_at?: string
          event_type?: string
          fixed_asset_id?: string
          gross_value_delta?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          payload_hash?: string
          recorded_at?: string
          source_id?: string
          source_type?: string
          source_version?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixed_asset_events_accounting_workplace_fkey"
            columns: ["accounting_event_id", "workplace_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "fixed_asset_events_asset_workplace_fkey"
            columns: ["fixed_asset_id", "workplace_id"]
            referencedRelation: "fixed_assets"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "fixed_asset_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixed_asset_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_assets: {
        Row: {
          acquisition_date: string | null
          asset_code: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          metadata: Json
          name: string
          placed_in_service_date: string | null
          retired_date: string | null
          source_id: string | null
          source_type: string | null
          status: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          acquisition_date?: string | null
          asset_code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json
          name: string
          placed_in_service_date?: string | null
          retired_date?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          acquisition_date?: string | null
          asset_code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json
          name?: string
          placed_in_service_date?: string | null
          retired_date?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixed_assets_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixed_assets_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_services: {
        Row: {
          active: boolean | null
          avg_time: string | null
          category: string
          cover_gif_path: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          description: string | null
          documents_required: string[] | null
          embedding: string | null
          fund_id: string
          fund_name: string
          funding_amount: number
          id: string
          institution: string | null
          jri_fee: number | null
          jri_fee_description: string | null
          metadata: Json | null
          order: number | null
          square_image_path: string | null
          subcategory: string | null
          timeline: string
          updated_at: string | null
          who_it_is_for: string | null
          why_it_is_needed: string | null
        }
        Insert: {
          active?: boolean | null
          avg_time?: string | null
          category: string
          cover_gif_path?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          documents_required?: string[] | null
          embedding?: string | null
          fund_id: string
          fund_name: string
          funding_amount: number
          id?: string
          institution?: string | null
          jri_fee?: number | null
          jri_fee_description?: string | null
          metadata?: Json | null
          order?: number | null
          square_image_path?: string | null
          subcategory?: string | null
          timeline: string
          updated_at?: string | null
          who_it_is_for?: string | null
          why_it_is_needed?: string | null
        }
        Update: {
          active?: boolean | null
          avg_time?: string | null
          category?: string
          cover_gif_path?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          documents_required?: string[] | null
          embedding?: string | null
          fund_id?: string
          fund_name?: string
          funding_amount?: number
          id?: string
          institution?: string | null
          jri_fee?: number | null
          jri_fee_description?: string | null
          metadata?: Json | null
          order?: number | null
          square_image_path?: string | null
          subcategory?: string | null
          timeline?: string
          updated_at?: string | null
          who_it_is_for?: string | null
          why_it_is_needed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funding_services_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      github_commit_mappings: {
        Row: {
          app_id: string
          branch: string | null
          commit_sha: string | null
          created_at: string
          id: string
          version_number: number | null
          workplace_id: string
        }
        Insert: {
          app_id: string
          branch?: string | null
          commit_sha?: string | null
          created_at?: string
          id?: string
          version_number?: number | null
          workplace_id: string
        }
        Update: {
          app_id?: string
          branch?: string | null
          commit_sha?: string | null
          created_at?: string
          id?: string
          version_number?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_commit_mappings_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_commit_mappings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_installations: {
        Row: {
          account_login: string | null
          account_type: string | null
          connected_by: string | null
          created_at: string
          id: string
          installation_id: number
          workplace_id: string
        }
        Insert: {
          account_login?: string | null
          account_type?: string | null
          connected_by?: string | null
          created_at?: string
          id?: string
          installation_id: number
          workplace_id: string
        }
        Update: {
          account_login?: string | null
          account_type?: string | null
          connected_by?: string | null
          created_at?: string
          id?: string
          installation_id?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_installations_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_oauth_states: {
        Row: {
          app_id: string | null
          created_at: string
          created_by: string | null
          expires_at: string
          private_repo: boolean
          state: string
          workplace_id: string
        }
        Insert: {
          app_id?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string
          private_repo?: boolean
          state: string
          workplace_id: string
        }
        Update: {
          app_id?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string
          private_repo?: boolean
          state?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_oauth_states_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_oauth_states_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_pull_requests: {
        Row: {
          app_id: string
          created_at: string
          head_branch: string | null
          id: string
          pr_number: number
          repo_full_name: string
          state: string | null
          url: string | null
          version_number: number | null
          workplace_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          head_branch?: string | null
          id?: string
          pr_number: number
          repo_full_name: string
          state?: string | null
          url?: string | null
          version_number?: number | null
          workplace_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          head_branch?: string | null
          id?: string
          pr_number?: number
          repo_full_name?: string
          state?: string | null
          url?: string | null
          version_number?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_pull_requests_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_pull_requests_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_repositories: {
        Row: {
          created_at: string
          default_branch: string | null
          full_name: string
          id: string
          installation_id: number
          private: boolean | null
          repo_id: number
          workplace_id: string
        }
        Insert: {
          created_at?: string
          default_branch?: string | null
          full_name: string
          id?: string
          installation_id: number
          private?: boolean | null
          repo_id: number
          workplace_id: string
        }
        Update: {
          created_at?: string
          default_branch?: string | null
          full_name?: string
          id?: string
          installation_id?: number
          private?: boolean | null
          repo_id?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_repositories_installation_id_fkey"
            columns: ["installation_id"]
            referencedRelation: "github_installations"
            referencedColumns: ["installation_id"]
          },
          {
            foreignKeyName: "github_repositories_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_repository_links: {
        Row: {
          app_id: string
          branch: string
          created_at: string
          created_by: string | null
          id: string
          installation_id: number
          repo_full_name: string
          workplace_id: string
        }
        Insert: {
          app_id: string
          branch?: string
          created_at?: string
          created_by?: string | null
          id?: string
          installation_id: number
          repo_full_name: string
          workplace_id: string
        }
        Update: {
          app_id?: string
          branch?: string
          created_at?: string
          created_by?: string | null
          id?: string
          installation_id?: number
          repo_full_name?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_repository_links_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_repository_links_installation_id_fkey"
            columns: ["installation_id"]
            referencedRelation: "github_installations"
            referencedColumns: ["installation_id"]
          },
          {
            foreignKeyName: "github_repository_links_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_sync_jobs: {
        Row: {
          app_id: string | null
          created_at: string
          detail: Json | null
          error: string | null
          finished_at: string | null
          id: string
          kind: string
          status: string
          workplace_id: string | null
        }
        Insert: {
          app_id?: string | null
          created_at?: string
          detail?: Json | null
          error?: string | null
          finished_at?: string | null
          id?: string
          kind: string
          status?: string
          workplace_id?: string | null
        }
        Update: {
          app_id?: string | null
          created_at?: string
          detail?: Json | null
          error?: string | null
          finished_at?: string | null
          id?: string
          kind?: string
          status?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "github_sync_jobs_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "amplify_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_sync_jobs_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      github_webhook_events: {
        Row: {
          created_at: string
          delivery_id: string | null
          event_type: string
          id: string
          installation_id: number | null
          payload: Json | null
          processed_at: string | null
        }
        Insert: {
          created_at?: string
          delivery_id?: string | null
          event_type: string
          id?: string
          installation_id?: number | null
          payload?: Json | null
          processed_at?: string | null
        }
        Update: {
          created_at?: string
          delivery_id?: string | null
          event_type?: string
          id?: string
          installation_id?: number | null
          payload?: Json | null
          processed_at?: string | null
        }
        Relationships: []
      }
      goods_receipt_notes: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          driver_name: string | null
          grn_date: string | null
          grn_number: string
          id: string
          inspected_at: string | null
          inspected_by: string | null
          inspection_notes: string | null
          inspection_required: boolean | null
          inspection_status: string | null
          inventory_updated: boolean | null
          inventory_updated_at: string | null
          inventory_updated_by: string | null
          location_id: string | null
          notes: string | null
          po_id: string | null
          received_by: string | null
          status: string | null
          subtotal: number | null
          tax_total: number | null
          total: number | null
          updated_at: string | null
          vehicle_number: string | null
          vendor_challan_date: string | null
          vendor_challan_no: string | null
          vendor_id: string | null
          workplace_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          driver_name?: string | null
          grn_date?: string | null
          grn_number: string
          id?: string
          inspected_at?: string | null
          inspected_by?: string | null
          inspection_notes?: string | null
          inspection_required?: boolean | null
          inspection_status?: string | null
          inventory_updated?: boolean | null
          inventory_updated_at?: string | null
          inventory_updated_by?: string | null
          location_id?: string | null
          notes?: string | null
          po_id?: string | null
          received_by?: string | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          total?: number | null
          updated_at?: string | null
          vehicle_number?: string | null
          vendor_challan_date?: string | null
          vendor_challan_no?: string | null
          vendor_id?: string | null
          workplace_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          driver_name?: string | null
          grn_date?: string | null
          grn_number?: string
          id?: string
          inspected_at?: string | null
          inspected_by?: string | null
          inspection_notes?: string | null
          inspection_required?: boolean | null
          inspection_status?: string | null
          inventory_updated?: boolean | null
          inventory_updated_at?: string | null
          inventory_updated_by?: string | null
          location_id?: string | null
          notes?: string | null
          po_id?: string | null
          received_by?: string | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          total?: number | null
          updated_at?: string | null
          vehicle_number?: string | null
          vendor_challan_date?: string | null
          vendor_challan_no?: string | null
          vendor_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goods_receipt_notes_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_inspected_by_fkey"
            columns: ["inspected_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_inventory_updated_by_fkey"
            columns: ["inventory_updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_po_id_fkey"
            columns: ["po_id"]
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_received_by_fkey"
            columns: ["received_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_items: {
        Row: {
          accepted_quantity: number | null
          barcode: string | null
          batch_id: string | null
          batch_number: string | null
          created_at: string | null
          description: string
          expiry_date: string | null
          grn_id: string
          hsn_sac: string | null
          id: string
          inspection_notes: string | null
          line_total: number | null
          ordered_quantity: number | null
          po_item_id: string | null
          product_id: string | null
          received_quantity: number | null
          rejected_quantity: number | null
          rejection_reason: string | null
          serial_numbers: string[] | null
          sku: string | null
          storage_location: string | null
          tax_rate: number | null
          unit: string | null
          unit_price: number | null
        }
        Insert: {
          accepted_quantity?: number | null
          barcode?: string | null
          batch_id?: string | null
          batch_number?: string | null
          created_at?: string | null
          description: string
          expiry_date?: string | null
          grn_id: string
          hsn_sac?: string | null
          id?: string
          inspection_notes?: string | null
          line_total?: number | null
          ordered_quantity?: number | null
          po_item_id?: string | null
          product_id?: string | null
          received_quantity?: number | null
          rejected_quantity?: number | null
          rejection_reason?: string | null
          serial_numbers?: string[] | null
          sku?: string | null
          storage_location?: string | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Update: {
          accepted_quantity?: number | null
          barcode?: string | null
          batch_id?: string | null
          batch_number?: string | null
          created_at?: string | null
          description?: string
          expiry_date?: string | null
          grn_id?: string
          hsn_sac?: string | null
          id?: string
          inspection_notes?: string | null
          line_total?: number | null
          ordered_quantity?: number | null
          po_item_id?: string | null
          product_id?: string | null
          received_quantity?: number | null
          rejected_quantity?: number | null
          rejection_reason?: string | null
          serial_numbers?: string[] | null
          sku?: string | null
          storage_location?: string | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grn_items_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "inventory_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_items_grn_id_fkey"
            columns: ["grn_id"]
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_items_po_item_id_fkey"
            columns: ["po_item_id"]
            referencedRelation: "purchase_order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_assets: {
        Row: {
          asset_type: string
          created_at: string | null
          created_by: string
          file_name: string
          file_size: number
          file_url: string
          id: string
          metadata: Json | null
          mime_type: string
          workplace_id: string
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          created_by: string
          file_name: string
          file_size: number
          file_url: string
          id?: string
          metadata?: Json | null
          mime_type: string
          workplace_id: string
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          created_by?: string
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          metadata?: Json | null
          mime_type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_assets_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_brand_assets: {
        Row: {
          approved: boolean
          asset_type: string
          created_at: string | null
          created_by: string | null
          file_size: number | null
          file_url: string | null
          id: string
          is_template: boolean
          metadata: Json
          mime_type: string | null
          name: string
          project: string | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          approved?: boolean
          asset_type: string
          created_at?: string | null
          created_by?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_template?: boolean
          metadata?: Json
          mime_type?: string | null
          name: string
          project?: string | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          approved?: boolean
          asset_type?: string
          created_at?: string | null
          created_by?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_template?: boolean
          metadata?: Json
          mime_type?: string | null
          name?: string
          project?: string | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_brand_assets_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_content_generations: {
        Row: {
          content_text: string
          content_type: string
          created_at: string | null
          created_by: string
          dna_profile_id: string | null
          id: string
          image_prompt: string | null
          length_category: string | null
          metadata: Json | null
          platform: string
          prompt: string
          style: string | null
          tone: string | null
          workplace_id: string
        }
        Insert: {
          content_text: string
          content_type?: string
          created_at?: string | null
          created_by: string
          dna_profile_id?: string | null
          id?: string
          image_prompt?: string | null
          length_category?: string | null
          metadata?: Json | null
          platform: string
          prompt: string
          style?: string | null
          tone?: string | null
          workplace_id: string
        }
        Update: {
          content_text?: string
          content_type?: string
          created_at?: string | null
          created_by?: string
          dna_profile_id?: string | null
          id?: string
          image_prompt?: string | null
          length_category?: string | null
          metadata?: Json | null
          platform?: string
          prompt?: string
          style?: string | null
          tone?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_content_generations_dna_profile_id_fkey"
            columns: ["dna_profile_id"]
            referencedRelation: "growth_dna_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_content_generations_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_crm_contacts: {
        Row: {
          company: string | null
          console_contact_id: string | null
          contact_type: string
          created_at: string | null
          email: string | null
          id: string
          last_contact_date: string | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          status: string
          tags: Json | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          company?: string | null
          console_contact_id?: string | null
          contact_type?: string
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          tags?: Json | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          company?: string | null
          console_contact_id?: string | null
          contact_type?: string
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          tags?: Json | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_crm_contacts_console_contact_id_fkey"
            columns: ["console_contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_crm_contacts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_crm_interactions: {
        Row: {
          contact_id: string
          created_at: string | null
          created_by: string
          description: string
          follow_up_date: string | null
          id: string
          interaction_date: string
          interaction_type: string
          outcome: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          created_by: string
          description: string
          follow_up_date?: string | null
          id?: string
          interaction_date: string
          interaction_type: string
          outcome?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          follow_up_date?: string | null
          id?: string
          interaction_date?: string
          interaction_type?: string
          outcome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_crm_interactions_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "growth_crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_design_versions: {
        Row: {
          created_at: string
          created_by: string | null
          design_id: string
          doc: Json
          id: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          design_id: string
          doc: Json
          id?: string
          version: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          design_id?: string
          doc?: Json
          id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "growth_design_versions_design_id_fkey"
            columns: ["design_id"]
            referencedRelation: "growth_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_designs: {
        Row: {
          created_at: string
          created_by: string | null
          doc: Json
          height: number
          id: string
          name: string
          thumbnail_url: string | null
          updated_at: string
          version: number
          width: number
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          doc?: Json
          height?: number
          id?: string
          name?: string
          thumbnail_url?: string | null
          updated_at?: string
          version?: number
          width?: number
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          doc?: Json
          height?: number
          id?: string
          name?: string
          thumbnail_url?: string | null
          updated_at?: string
          version?: number
          width?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_designs_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_dna_audiences: {
        Row: {
          audience_description: string | null
          audience_name: string
          created_at: string | null
          dna_profile_id: string
          id: string
          order_index: number
          updated_at: string | null
          version_number: number | null
        }
        Insert: {
          audience_description?: string | null
          audience_name: string
          created_at?: string | null
          dna_profile_id: string
          id?: string
          order_index?: number
          updated_at?: string | null
          version_number?: number | null
        }
        Update: {
          audience_description?: string | null
          audience_name?: string
          created_at?: string | null
          dna_profile_id?: string
          id?: string
          order_index?: number
          updated_at?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_dna_audiences_dna_profile_id_fkey"
            columns: ["dna_profile_id"]
            referencedRelation: "growth_dna_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_dna_profiles: {
        Row: {
          brand_avatar: string | null
          brand_introduction: string | null
          brand_mascot: string | null
          brand_name: string
          created_at: string | null
          created_by: string
          creative_logo: string | null
          id: string
          is_active: boolean | null
          logo: string | null
          logo_symbol: string | null
          tone_of_voice: string | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          brand_avatar?: string | null
          brand_introduction?: string | null
          brand_mascot?: string | null
          brand_name: string
          created_at?: string | null
          created_by: string
          creative_logo?: string | null
          id?: string
          is_active?: boolean | null
          logo?: string | null
          logo_symbol?: string | null
          tone_of_voice?: string | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          brand_avatar?: string | null
          brand_introduction?: string | null
          brand_mascot?: string | null
          brand_name?: string
          created_at?: string | null
          created_by?: string
          creative_logo?: string | null
          id?: string
          is_active?: boolean | null
          logo?: string | null
          logo_symbol?: string | null
          tone_of_voice?: string | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_dna_profiles_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_dna_selling_points: {
        Row: {
          created_at: string | null
          dna_profile_id: string
          id: string
          order_index: number
          selling_point: string
          updated_at: string | null
          version_number: number | null
        }
        Insert: {
          created_at?: string | null
          dna_profile_id: string
          id?: string
          order_index?: number
          selling_point: string
          updated_at?: string | null
          version_number?: number | null
        }
        Update: {
          created_at?: string | null
          dna_profile_id?: string
          id?: string
          order_index?: number
          selling_point?: string
          updated_at?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_dna_selling_points_dna_profile_id_fkey"
            columns: ["dna_profile_id"]
            referencedRelation: "growth_dna_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_dna_versions: {
        Row: {
          brand_introduction: string | null
          brand_name: string
          change_reason: string | null
          created_at: string | null
          created_by: string
          dna_profile_id: string
          id: string
          tone_of_voice: string | null
          version_number: number
        }
        Insert: {
          brand_introduction?: string | null
          brand_name: string
          change_reason?: string | null
          created_at?: string | null
          created_by: string
          dna_profile_id: string
          id?: string
          tone_of_voice?: string | null
          version_number: number
        }
        Update: {
          brand_introduction?: string | null
          brand_name?: string
          change_reason?: string | null
          created_at?: string | null
          created_by?: string
          dna_profile_id?: string
          id?: string
          tone_of_voice?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "growth_dna_versions_dna_profile_id_fkey"
            columns: ["dna_profile_id"]
            referencedRelation: "growth_dna_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_social_accounts: {
        Row: {
          access_token: string | null
          account_display_name: string | null
          account_url: string | null
          account_username: string
          created_at: string | null
          created_by: string
          id: string
          is_active: boolean | null
          platform: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          access_token?: string | null
          account_display_name?: string | null
          account_url?: string | null
          account_username: string
          created_at?: string | null
          created_by: string
          id?: string
          is_active?: boolean | null
          platform: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          access_token?: string | null
          account_display_name?: string | null
          account_url?: string | null
          account_username?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_social_accounts_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_social_metrics: {
        Row: {
          comments_count: number | null
          created_at: string | null
          engagement_rate: number | null
          followers_count: number | null
          following_count: number | null
          id: string
          impressions_count: number | null
          likes_count: number | null
          metric_date: string
          post_id: string | null
          posts_count: number | null
          reach_count: number | null
          shares_count: number | null
          social_account_id: string
        }
        Insert: {
          comments_count?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          impressions_count?: number | null
          likes_count?: number | null
          metric_date: string
          post_id?: string | null
          posts_count?: number | null
          reach_count?: number | null
          shares_count?: number | null
          social_account_id: string
        }
        Update: {
          comments_count?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          impressions_count?: number | null
          likes_count?: number | null
          metric_date?: string
          post_id?: string | null
          posts_count?: number | null
          reach_count?: number | null
          shares_count?: number | null
          social_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_social_metrics_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "growth_social_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_social_metrics_social_account_id_fkey"
            columns: ["social_account_id"]
            referencedRelation: "growth_social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_social_post_metrics: {
        Row: {
          comments_count: number | null
          created_at: string | null
          engagement_rate: number | null
          id: string
          impressions_count: number | null
          likes_count: number | null
          metric_date: string
          post_id: string
          reach_count: number | null
          shares_count: number | null
        }
        Insert: {
          comments_count?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          impressions_count?: number | null
          likes_count?: number | null
          metric_date: string
          post_id: string
          reach_count?: number | null
          shares_count?: number | null
        }
        Update: {
          comments_count?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          impressions_count?: number | null
          likes_count?: number | null
          metric_date?: string
          post_id?: string
          reach_count?: number | null
          shares_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_social_post_metrics_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "growth_social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_social_posts: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          media_urls: Json | null
          platform_post_id: string | null
          post_type: string
          published_at: string | null
          scheduled_at: string | null
          social_account_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          media_urls?: Json | null
          platform_post_id?: string | null
          post_type?: string
          published_at?: string | null
          scheduled_at?: string | null
          social_account_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          media_urls?: Json | null
          platform_post_id?: string | null
          post_type?: string
          published_at?: string | null
          scheduled_at?: string | null
          social_account_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_social_posts_social_account_id_fkey"
            columns: ["social_account_id"]
            referencedRelation: "growth_social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      gst_return_lines: {
        Row: {
          created_at: string | null
          gst_return_id: string
          hsn_sac: string | null
          id: string
          invoice_id: string | null
          line_type: string
          tax_amount: number
          tax_rate: number
          taxable_amount: number
        }
        Insert: {
          created_at?: string | null
          gst_return_id: string
          hsn_sac?: string | null
          id?: string
          invoice_id?: string | null
          line_type: string
          tax_amount: number
          tax_rate: number
          taxable_amount: number
        }
        Update: {
          created_at?: string | null
          gst_return_id?: string
          hsn_sac?: string | null
          id?: string
          invoice_id?: string | null
          line_type?: string
          tax_amount?: number
          tax_rate?: number
          taxable_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "gst_return_lines_gst_return_id_fkey"
            columns: ["gst_return_id"]
            referencedRelation: "gst_returns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gst_return_lines_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      gst_returns: {
        Row: {
          created_at: string | null
          due_date: string
          filed_by: string | null
          filed_date: string | null
          id: string
          json_data: Json | null
          period_end: string
          period_start: string
          status: Database["public"]["Enums"]["gst_return_status"]
          type: Database["public"]["Enums"]["gst_return_type"]
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          due_date: string
          filed_by?: string | null
          filed_date?: string | null
          id?: string
          json_data?: Json | null
          period_end: string
          period_start: string
          status?: Database["public"]["Enums"]["gst_return_status"]
          type: Database["public"]["Enums"]["gst_return_type"]
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          due_date?: string
          filed_by?: string | null
          filed_date?: string | null
          id?: string
          json_data?: Json | null
          period_end?: string
          period_start?: string
          status?: Database["public"]["Enums"]["gst_return_status"]
          type?: Database["public"]["Enums"]["gst_return_type"]
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gst_returns_filed_by_fkey"
            columns: ["filed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gst_returns_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      hsn_master: {
        Row: {
          chapter: string | null
          code: string
          created_at: string | null
          description: string | null
          gst_rate: number | null
          id: string
          is_active: boolean | null
          type: string | null
        }
        Insert: {
          chapter?: string | null
          code: string
          created_at?: string | null
          description?: string | null
          gst_rate?: number | null
          id?: string
          is_active?: boolean | null
          type?: string | null
        }
        Update: {
          chapter?: string | null
          code?: string
          created_at?: string | null
          description?: string | null
          gst_rate?: number | null
          id?: string
          is_active?: boolean | null
          type?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          entity_type_id: string | null
          id: string
          is_active: boolean | null
          name: string
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entity_type_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entity_type_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "industries_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "industries_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_types"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_batches: {
        Row: {
          batch_number: string | null
          cost_price: number | null
          created_at: string | null
          expiry_date: string | null
          id: string
          location_id: string | null
          product_id: string
          quantity: number
          serial_number: string | null
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          cost_price?: number | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          location_id?: string | null
          product_id: string
          quantity?: number
          serial_number?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          cost_price?: number | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          location_id?: string | null
          product_id?: string
          quantity?: number
          serial_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_batches_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_batches_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_locations: {
        Row: {
          address_id: string | null
          contact_phone: string | null
          created_at: string | null
          gst_state_code: string | null
          id: string
          is_default: boolean | null
          is_pos_enabled: boolean | null
          location_type: string | null
          name: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          address_id?: string | null
          contact_phone?: string | null
          created_at?: string | null
          gst_state_code?: string | null
          id?: string
          is_default?: boolean | null
          is_pos_enabled?: boolean | null
          location_type?: string | null
          name: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          address_id?: string | null
          contact_phone?: string | null
          created_at?: string | null
          gst_state_code?: string | null
          id?: string
          is_default?: boolean | null
          is_pos_enabled?: boolean | null
          location_type?: string | null
          name?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_locations_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_locations_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_snapshots: {
        Row: {
          id: string
          location_id: string | null
          product_id: string
          stock_level: number
          supplier_id: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          location_id?: string | null
          product_id: string
          stock_level?: number
          supplier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          location_id?: string | null
          product_id?: string
          stock_level?: number
          supplier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_snapshots_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_snapshots_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_snapshots_supplier_id_fkey"
            columns: ["supplier_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          buyer_id: string | null
          cost_source: string | null
          created_at: string | null
          created_by: string
          id: string
          location_id: string | null
          notes: string | null
          product_id: string
          quantity: number
          reference_id: string | null
          reference_line_id: string | null
          reference_type: string | null
          supplier_id: string | null
          total_cost: number | null
          transaction_type: Database["public"]["Enums"]["inventory_transaction_type"]
          unit_cost: number | null
        }
        Insert: {
          buyer_id?: string | null
          cost_source?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          location_id?: string | null
          notes?: string | null
          product_id: string
          quantity: number
          reference_id?: string | null
          reference_line_id?: string | null
          reference_type?: string | null
          supplier_id?: string | null
          total_cost?: number | null
          transaction_type: Database["public"]["Enums"]["inventory_transaction_type"]
          unit_cost?: number | null
        }
        Update: {
          buyer_id?: string | null
          cost_source?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          location_id?: string | null
          notes?: string | null
          product_id?: string
          quantity?: number
          reference_id?: string | null
          reference_line_id?: string | null
          reference_type?: string | null
          supplier_id?: string | null
          total_cost?: number | null
          transaction_type?: Database["public"]["Enums"]["inventory_transaction_type"]
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_supplier_id_fkey"
            columns: ["supplier_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_valuation_events: {
        Row: {
          cost_basis: string
          created_by: string | null
          effective_at: string
          event_type: string
          id: string
          idempotency_key: string | null
          location_id: string | null
          metadata: Json
          payload_hash: string
          product_id: string
          quantity_delta: number
          recorded_at: string
          reverses_event_id: string | null
          source_id: string
          source_line_id: string | null
          source_type: string
          source_version: number
          total_cost_delta: number | null
          unit_cost: number
          workplace_id: string
        }
        Insert: {
          cost_basis: string
          created_by?: string | null
          effective_at: string
          event_type: string
          id?: string
          idempotency_key?: string | null
          location_id?: string | null
          metadata?: Json
          payload_hash: string
          product_id: string
          quantity_delta: number
          recorded_at?: string
          reverses_event_id?: string | null
          source_id: string
          source_line_id?: string | null
          source_type: string
          source_version?: number
          total_cost_delta?: number | null
          unit_cost: number
          workplace_id: string
        }
        Update: {
          cost_basis?: string
          created_by?: string | null
          effective_at?: string
          event_type?: string
          id?: string
          idempotency_key?: string | null
          location_id?: string | null
          metadata?: Json
          payload_hash?: string
          product_id?: string
          quantity_delta?: number
          recorded_at?: string
          reverses_event_id?: string | null
          source_id?: string
          source_line_id?: string | null
          source_type?: string
          source_version?: number
          total_cost_delta?: number | null
          unit_cost?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_valuation_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_valuation_events_location_workplace_fkey"
            columns: ["location_id", "workplace_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "inventory_valuation_events_product_workplace_fkey"
            columns: ["product_id", "workplace_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "inventory_valuation_events_reverses_event_id_fkey"
            columns: ["reverses_event_id"]
            referencedRelation: "inventory_valuation_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_valuation_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          cost_at_sale: number | null
          cost_source: string | null
          cost_total: number | null
          created_at: string | null
          description: string
          discount_amount: number | null
          discount_percentage: number | null
          hsn_sac: string | null
          id: string
          invoice_id: string
          line_total: number
          metadata: Json | null
          product_id: string | null
          quantity: number
          tax_rate: number
          unit: string | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          cost_at_sale?: number | null
          cost_source?: string | null
          cost_total?: number | null
          created_at?: string | null
          description: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          invoice_id: string
          line_total?: number
          metadata?: Json | null
          product_id?: string | null
          quantity?: number
          tax_rate?: number
          unit?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Update: {
          cost_at_sale?: number | null
          cost_source?: string | null
          cost_total?: number | null
          created_at?: string | null
          description?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          invoice_id?: string
          line_total?: number
          metadata?: Json | null
          product_id?: string | null
          quantity?: number
          tax_rate?: number
          unit?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_payments: {
        Row: {
          amount: number
          attachments: Json | null
          bank_account_id: string | null
          bank_statement_date: string | null
          bank_statement_line_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method: string
          payment_type: string | null
          reconciled: boolean | null
          reconciled_at: string | null
          reconciled_by: string | null
          reconciled_date: string | null
          reconciliation_status: string | null
          reference_number: string | null
          store_credit_amount: number | null
          store_credit_id: string | null
          updated_at: string | null
          workplace_id: string | null
        }
        Insert: {
          amount: number
          attachments?: Json | null
          bank_account_id?: string | null
          bank_statement_date?: string | null
          bank_statement_line_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id: string
          notes?: string | null
          payment_date: string
          payment_method: string
          payment_type?: string | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          reconciliation_status?: string | null
          reference_number?: string | null
          store_credit_amount?: number | null
          store_credit_id?: string | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Update: {
          amount?: number
          attachments?: Json | null
          bank_account_id?: string | null
          bank_statement_date?: string | null
          bank_statement_line_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_type?: string | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          reconciliation_status?: string | null
          reference_number?: string | null
          store_credit_amount?: number | null
          store_credit_id?: string | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_bank_statement_line_id_fkey"
            columns: ["bank_statement_line_id"]
            referencedRelation: "bank_statement_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_store_credit_id_fkey"
            columns: ["store_credit_id"]
            referencedRelation: "store_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_share_tokens: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          invoice_id: string
          last_accessed_at: string | null
          revoked_at: string | null
          token_hash: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          invoice_id: string
          last_accessed_at?: string | null
          revoked_at?: string | null
          token_hash: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          invoice_id?: string
          last_accessed_at?: string | null
          revoked_at?: string | null
          token_hash?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_share_tokens_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_share_tokens_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          balance_due: number | null
          cgst_amount: number | null
          confirmed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          currency: string
          date: string
          delivered_at: string | null
          discount_amount: number | null
          discount_id: string | null
          discount_label: string | null
          discount_percentage: number | null
          due_date: string | null
          email_sent_at: string | null
          email_sent_to: string | null
          email_status: string | null
          eway_bill_date: string | null
          eway_bill_no: string | null
          eway_no: string | null
          exchange_rate: number
          export_country_code: string | null
          font_family: string | null
          gst_supply_classification_source: string
          gst_supply_type: string
          id: string
          igst_amount: number | null
          irn: string | null
          irn_date: string | null
          irn_generated: boolean | null
          is_interstate: boolean | null
          is_public: boolean | null
          last_payment_date: string | null
          location_id: string | null
          logo_url: string | null
          loyalty_redemption_amount: number
          loyalty_tier_id: string | null
          lut_bond_number: string | null
          metadata: Json | null
          notes: string | null
          number: string
          order_status: string | null
          original_invoice_id: string | null
          paid_amount: number
          pdf_generated_at: string | null
          pdf_url: string | null
          place_of_supply: string | null
          port_code: string | null
          pos_session_id: string | null
          pos_terminal_id: string | null
          pos_transaction_id: string | null
          previous_balance: number | null
          primary_color: string | null
          ready_at: string | null
          reverse_charge: boolean | null
          sez_gstin: string | null
          sgst_amount: number | null
          shipping_bill_date: string | null
          shipping_bill_number: string | null
          shipping_charges: number | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax_total: number
          tcs_amount: number | null
          tcs_applicable: boolean | null
          tcs_nature: string | null
          tcs_rate: number | null
          tcs_section: string | null
          terms: string | null
          tier_discount_amount: number | null
          total: number
          type: Database["public"]["Enums"]["invoice_type"]
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          balance_due?: number | null
          cgst_amount?: number | null
          confirmed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by: string
          currency?: string
          date?: string
          delivered_at?: string | null
          discount_amount?: number | null
          discount_id?: string | null
          discount_label?: string | null
          discount_percentage?: number | null
          due_date?: string | null
          email_sent_at?: string | null
          email_sent_to?: string | null
          email_status?: string | null
          eway_bill_date?: string | null
          eway_bill_no?: string | null
          eway_no?: string | null
          exchange_rate?: number
          export_country_code?: string | null
          font_family?: string | null
          gst_supply_classification_source?: string
          gst_supply_type?: string
          id?: string
          igst_amount?: number | null
          irn?: string | null
          irn_date?: string | null
          irn_generated?: boolean | null
          is_interstate?: boolean | null
          is_public?: boolean | null
          last_payment_date?: string | null
          location_id?: string | null
          logo_url?: string | null
          loyalty_redemption_amount?: number
          loyalty_tier_id?: string | null
          lut_bond_number?: string | null
          metadata?: Json | null
          notes?: string | null
          number: string
          order_status?: string | null
          original_invoice_id?: string | null
          paid_amount?: number
          pdf_generated_at?: string | null
          pdf_url?: string | null
          place_of_supply?: string | null
          port_code?: string | null
          pos_session_id?: string | null
          pos_terminal_id?: string | null
          pos_transaction_id?: string | null
          previous_balance?: number | null
          primary_color?: string | null
          ready_at?: string | null
          reverse_charge?: boolean | null
          sez_gstin?: string | null
          sgst_amount?: number | null
          shipping_bill_date?: string | null
          shipping_bill_number?: string | null
          shipping_charges?: number | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax_total?: number
          tcs_amount?: number | null
          tcs_applicable?: boolean | null
          tcs_nature?: string | null
          tcs_rate?: number | null
          tcs_section?: string | null
          terms?: string | null
          tier_discount_amount?: number | null
          total?: number
          type?: Database["public"]["Enums"]["invoice_type"]
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          balance_due?: number | null
          cgst_amount?: number | null
          confirmed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          currency?: string
          date?: string
          delivered_at?: string | null
          discount_amount?: number | null
          discount_id?: string | null
          discount_label?: string | null
          discount_percentage?: number | null
          due_date?: string | null
          email_sent_at?: string | null
          email_sent_to?: string | null
          email_status?: string | null
          eway_bill_date?: string | null
          eway_bill_no?: string | null
          eway_no?: string | null
          exchange_rate?: number
          export_country_code?: string | null
          font_family?: string | null
          gst_supply_classification_source?: string
          gst_supply_type?: string
          id?: string
          igst_amount?: number | null
          irn?: string | null
          irn_date?: string | null
          irn_generated?: boolean | null
          is_interstate?: boolean | null
          is_public?: boolean | null
          last_payment_date?: string | null
          location_id?: string | null
          logo_url?: string | null
          loyalty_redemption_amount?: number
          loyalty_tier_id?: string | null
          lut_bond_number?: string | null
          metadata?: Json | null
          notes?: string | null
          number?: string
          order_status?: string | null
          original_invoice_id?: string | null
          paid_amount?: number
          pdf_generated_at?: string | null
          pdf_url?: string | null
          place_of_supply?: string | null
          port_code?: string | null
          pos_session_id?: string | null
          pos_terminal_id?: string | null
          pos_transaction_id?: string | null
          previous_balance?: number | null
          primary_color?: string | null
          ready_at?: string | null
          reverse_charge?: boolean | null
          sez_gstin?: string | null
          sgst_amount?: number | null
          shipping_bill_date?: string | null
          shipping_bill_number?: string | null
          shipping_charges?: number | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax_total?: number
          tcs_amount?: number | null
          tcs_applicable?: boolean | null
          tcs_nature?: string | null
          tcs_rate?: number | null
          tcs_section?: string | null
          terms?: string | null
          tier_discount_amount?: number | null
          total?: number
          type?: Database["public"]["Enums"]["invoice_type"]
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_invoices_pos_session"
            columns: ["pos_session_id"]
            referencedRelation: "pos_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_invoices_pos_terminal"
            columns: ["pos_terminal_id"]
            referencedRelation: "pos_terminals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_discount_id_fkey"
            columns: ["discount_id"]
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_loyalty_tier_id_fkey"
            columns: ["loyalty_tier_id"]
            referencedRelation: "loyalty_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_original_invoice_id_fkey"
            columns: ["original_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      irp_integration_queue: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          invoice_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "irp_integration_queue_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_hsn_codes: {
        Row: {
          category: string | null
          code: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          tax_rate: number
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          tax_rate: number
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          tax_rate?: number
        }
        Relationships: []
      }
      jri_invoice_activities: {
        Row: {
          activity_id: string
          activity_type: string
          created_at: string | null
          id: string
          invoice_id: string | null
          metadata: Json | null
        }
        Insert: {
          activity_id: string
          activity_type: string
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
        }
        Update: {
          activity_id?: string
          activity_type?: string
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_activities_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "jri_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoice_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_history_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_history_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "jri_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoice_items: {
        Row: {
          created_at: string | null
          description: string
          hsn_code: string | null
          id: string
          invoice_id: string | null
          metadata: Json | null
          quantity: number
          source_id: string | null
          source_type: string | null
          tax_rate: number | null
          taxable_amount: number | null
          total: number
          unit_price: number
          workplace_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          hsn_code?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          quantity?: number
          source_id?: string | null
          source_type?: string | null
          tax_rate?: number | null
          taxable_amount?: number | null
          total: number
          unit_price: number
          workplace_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          hsn_code?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          quantity?: number
          source_id?: string | null
          source_type?: string | null
          tax_rate?: number | null
          taxable_amount?: number | null
          total?: number
          unit_price?: number
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "jri_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_items_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoice_payments: {
        Row: {
          amount: number
          bank_account_id: string | null
          bank_reference: string | null
          created_at: string | null
          created_by: string | null
          id: string
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          bank_account_id?: string | null
          bank_reference?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id: string
          notes?: string | null
          payment_date?: string
          payment_method: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          bank_reference?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "jri_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoice_settings: {
        Row: {
          bank_details: Json | null
          company_address: string
          company_gstin: string
          company_name: string
          company_pan: string
          company_state_code: string
          created_at: string | null
          default_template_id: string | null
          id: string
          invoice_prefix: string | null
          invoice_starting_number: number | null
          metadata: Json | null
          tax_settings: Json | null
          terms_and_conditions: string | null
          updated_at: string | null
          workplace_id: string | null
        }
        Insert: {
          bank_details?: Json | null
          company_address: string
          company_gstin: string
          company_name: string
          company_pan: string
          company_state_code: string
          created_at?: string | null
          default_template_id?: string | null
          id?: string
          invoice_prefix?: string | null
          invoice_starting_number?: number | null
          metadata?: Json | null
          tax_settings?: Json | null
          terms_and_conditions?: string | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Update: {
          bank_details?: Json | null
          company_address?: string
          company_gstin?: string
          company_name?: string
          company_pan?: string
          company_state_code?: string
          created_at?: string | null
          default_template_id?: string | null
          id?: string
          invoice_prefix?: string | null
          invoice_starting_number?: number | null
          metadata?: Json | null
          tax_settings?: Json | null
          terms_and_conditions?: string | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_settings_default_template_id_fkey"
            columns: ["default_template_id"]
            referencedRelation: "jri_invoice_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_settings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoice_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          css_styles: string | null
          description: string | null
          html_template: string
          id: string
          is_default: boolean | null
          metadata: Json | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          css_styles?: string | null
          description?: string | null
          html_template: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          css_styles?: string | null
          description?: string | null
          html_template?: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoice_templates_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoice_templates_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_invoices: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          customer_email: string
          customer_name: string
          delivery_address: Json | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          is_recurring: boolean | null
          is_reverse_charge: boolean | null
          last_generated_at: string | null
          linked_ticket_ids: string[] | null
          metadata: Json | null
          next_due_at: string | null
          notes: string | null
          overdue_reminder_count: number | null
          payment_due_reminder_sent: boolean | null
          place_of_supply: string | null
          razorpay_invoice_id: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_payment_link: string | null
          razorpay_payment_link_id: string | null
          recipient_gstin: string | null
          recurrence: string | null
          rejection_reason: string | null
          requires_approval: boolean | null
          sent_via: string | null
          state_code: string | null
          status: string
          supplier_gstin: string | null
          tax_details: Json | null
          template_id: string | null
          total_amount: number
          type: string | null
          updated_at: string | null
          updated_by: string | null
          workplace_id: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_email: string
          customer_name: string
          delivery_address?: Json | null
          due_date: string
          id?: string
          invoice_date: string
          invoice_number: string
          is_recurring?: boolean | null
          is_reverse_charge?: boolean | null
          last_generated_at?: string | null
          linked_ticket_ids?: string[] | null
          metadata?: Json | null
          next_due_at?: string | null
          notes?: string | null
          overdue_reminder_count?: number | null
          payment_due_reminder_sent?: boolean | null
          place_of_supply?: string | null
          razorpay_invoice_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_payment_link?: string | null
          razorpay_payment_link_id?: string | null
          recipient_gstin?: string | null
          recurrence?: string | null
          rejection_reason?: string | null
          requires_approval?: boolean | null
          sent_via?: string | null
          state_code?: string | null
          status?: string
          supplier_gstin?: string | null
          tax_details?: Json | null
          template_id?: string | null
          total_amount?: number
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          workplace_id?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_email?: string
          customer_name?: string
          delivery_address?: Json | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          is_recurring?: boolean | null
          is_reverse_charge?: boolean | null
          last_generated_at?: string | null
          linked_ticket_ids?: string[] | null
          metadata?: Json | null
          next_due_at?: string | null
          notes?: string | null
          overdue_reminder_count?: number | null
          payment_due_reminder_sent?: boolean | null
          place_of_supply?: string | null
          razorpay_invoice_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_payment_link?: string | null
          razorpay_payment_link_id?: string | null
          recipient_gstin?: string | null
          recurrence?: string | null
          rejection_reason?: string | null
          requires_approval?: boolean | null
          sent_via?: string | null
          state_code?: string | null
          status?: string
          supplier_gstin?: string | null
          tax_details?: Json | null
          template_id?: string | null
          total_amount?: number
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_invoices_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoices_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoices_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "jri_invoice_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoices_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_invoices_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      jri_support_requests: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          service_id: string | null
          status: string | null
          ticket_id: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          service_id?: string | null
          status?: string | null
          ticket_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          service_id?: string | null
          status?: string | null
          ticket_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jri_support_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_support_requests_service_id_fkey"
            columns: ["service_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jri_support_requests_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_settings: {
        Row: {
          created_at: string | null
          enabled: boolean
          id: string
          min_redemption_points: number
          points_per_currency: number
          redemption_value: number
          signup_bonus: number
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          min_redemption_points?: number
          points_per_currency?: number
          redemption_value?: number
          signup_bonus?: number
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          min_redemption_points?: number
          points_per_currency?: number
          redemption_value?: number
          signup_bonus?: number
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_settings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_tiers: {
        Row: {
          created_at: string | null
          discount_percentage: number | null
          id: string
          min_spend_amount: number | null
          name: string
          point_multiplier: number | null
          spend_time_period_days: number | null
          updated_at: string | null
          workplace_id: string | null
        }
        Insert: {
          created_at?: string | null
          discount_percentage?: number | null
          id?: string
          min_spend_amount?: number | null
          name: string
          point_multiplier?: number | null
          spend_time_period_days?: number | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Update: {
          created_at?: string | null
          discount_percentage?: number | null
          id?: string
          min_spend_amount?: number | null
          name?: string
          point_multiplier?: number | null
          spend_time_period_days?: number | null
          updated_at?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_tiers_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_transactions: {
        Row: {
          balance_after: number
          contact_id: string
          created_at: string | null
          created_by: string
          id: string
          notes: string | null
          points: number
          reference_id: string | null
          reference_type: string | null
          type: string
          workplace_id: string
        }
        Insert: {
          balance_after: number
          contact_id: string
          created_at?: string | null
          created_by: string
          id?: string
          notes?: string | null
          points: number
          reference_id?: string | null
          reference_type?: string | null
          type: string
          workplace_id: string
        }
        Update: {
          balance_after?: number
          contact_id?: string
          created_at?: string | null
          created_by?: string
          id?: string
          notes?: string | null
          points?: number
          reference_id?: string | null
          reference_type?: string | null
          type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_transactions_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_tool_audit: {
        Row: {
          actor_user_id: string | null
          app_id: string | null
          approval_id: string | null
          args_summary: string | null
          correlation_id: string | null
          created_at: string
          duration_ms: number | null
          id: string
          input_hash: string | null
          status: string | null
          tier: string | null
          token_id: string | null
          tool: string
          workplace_id: string
        }
        Insert: {
          actor_user_id?: string | null
          app_id?: string | null
          approval_id?: string | null
          args_summary?: string | null
          correlation_id?: string | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          input_hash?: string | null
          status?: string | null
          tier?: string | null
          token_id?: string | null
          tool: string
          workplace_id: string
        }
        Update: {
          actor_user_id?: string | null
          app_id?: string | null
          approval_id?: string | null
          args_summary?: string | null
          correlation_id?: string | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          input_hash?: string | null
          status?: string | null
          tier?: string | null
          token_id?: string | null
          tool?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mcp_tool_audit_approval_id_fkey"
            columns: ["approval_id"]
            referencedRelation: "agent_proposed_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mcp_tool_audit_token_id_fkey"
            columns: ["token_id"]
            referencedRelation: "workplace_mcp_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mcp_tool_audit_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_tool_policies: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          tier: string
          tool_name: string
          updated_at: string
          updated_by: string | null
          workplace_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          tier?: string
          tool_name: string
          updated_at?: string
          updated_by?: string | null
          workplace_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          tier?: string
          tool_name?: string
          updated_at?: string
          updated_by?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mcp_tool_policies_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mcp_tool_policies_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      note_mentions: {
        Row: {
          created_at: string | null
          id: string
          note_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          note_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          note_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_mentions_note_id_fkey"
            columns: ["note_id"]
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_mentions_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          title: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          title: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          title?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_configs: {
        Row: {
          channels: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          lead_days: number
          scope_id: string | null
          scope_type: string
          templates: Json
        }
        Insert: {
          channels: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          lead_days: number
          scope_id?: string | null
          scope_type: string
          templates: Json
        }
        Update: {
          channels?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          lead_days?: number
          scope_id?: string | null
          scope_type?: string
          templates?: Json
        }
        Relationships: [
          {
            foreignKeyName: "notification_configs_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_digest_log: {
        Row: {
          created_at: string
          digest_date: string
          id: string
          items_count: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          digest_date: string
          id?: string
          items_count?: number
          profile_id: string
        }
        Update: {
          created_at?: string
          digest_date?: string
          id?: string
          items_count?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_digest_log_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_email_log: {
        Row: {
          created_at: string
          email: string | null
          error: string | null
          notification_id: string
          profile_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          error?: string | null
          notification_id: string
          profile_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          error?: string | null
          notification_id?: string
          profile_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_email_log_notification_id_fkey"
            columns: ["notification_id"]
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          id: string
          in_app_enabled: boolean | null
          notification_type: string
          profile_id: string
          push_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          notification_type: string
          profile_id: string
          push_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          notification_type?: string
          profile_id?: string
          push_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_push_log: {
        Row: {
          attempt_count: number
          claimed_at: string | null
          created_at: string
          error: string | null
          notification_id: string
          profile_id: string
          provider_status: number | null
          status: string
          subscription_id: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          claimed_at?: string | null
          created_at?: string
          error?: string | null
          notification_id: string
          profile_id: string
          provider_status?: number | null
          status: string
          subscription_id: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          claimed_at?: string | null
          created_at?: string
          error?: string | null
          notification_id?: string
          profile_id?: string
          provider_status?: number | null
          status?: string
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_push_log_notification_id_fkey"
            columns: ["notification_id"]
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_push_log_subscription_id_fkey"
            columns: ["subscription_id"]
            referencedRelation: "push_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_queue: {
        Row: {
          config_id: string | null
          content: string
          created_at: string | null
          id: string
          link: string | null
          profile_id: string
          scheduled_at: string | null
          status: string
          title: string
          type: string
          workplace_id: string
        }
        Insert: {
          config_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          link?: string | null
          profile_id: string
          scheduled_at?: string | null
          status?: string
          title: string
          type: string
          workplace_id: string
        }
        Update: {
          config_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          link?: string | null
          profile_id?: string
          scheduled_at?: string | null
          status?: string
          title?: string
          type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_queue_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_queue_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          config_id: string | null
          content: string
          created_at: string | null
          id: string
          link: string | null
          profile_id: string
          read: boolean | null
          title: string
          type: string
          workplace_id: string | null
        }
        Insert: {
          config_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          link?: string | null
          profile_id: string
          read?: boolean | null
          title: string
          type: string
          workplace_id?: string | null
        }
        Update: {
          config_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          link?: string | null
          profile_id?: string
          read?: boolean | null
          title?: string
          type?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notify_config: {
        Row: {
          api_key: string | null
          dispatch_secret: string | null
          dispatch_url: string | null
          id: number
          updated_at: string
        }
        Insert: {
          api_key?: string | null
          dispatch_secret?: string | null
          dispatch_url?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          api_key?: string | null
          dispatch_secret?: string | null
          dispatch_url?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      notify_push_config: {
        Row: {
          api_key: string | null
          dispatch_secret: string | null
          dispatch_url: string | null
          id: number
          updated_at: string
        }
        Insert: {
          api_key?: string | null
          dispatch_secret?: string | null
          dispatch_url?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          api_key?: string | null
          dispatch_secret?: string | null
          dispatch_url?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_setup_claims: {
        Row: {
          claimed_by: string | null
          created_at: string
          workplace_id: string
        }
        Insert: {
          claimed_by?: string | null
          created_at?: string
          workplace_id: string
        }
        Update: {
          claimed_by?: string | null
          created_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_setup_claims_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      Opportunities: {
        Row: {
          amount: string | null
          apply_link: string | null
          description: string | null
          eligibility: string | null
          id: string | null
          last_date: string | null
          logo: string | null
          name: string | null
          opportunity_type: string | null
          provider: string | null
          v: string | null
        }
        Insert: {
          amount?: string | null
          apply_link?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string | null
          last_date?: string | null
          logo?: string | null
          name?: string | null
          opportunity_type?: string | null
          provider?: string | null
          v?: string | null
        }
        Update: {
          amount?: string | null
          apply_link?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string | null
          last_date?: string | null
          logo?: string | null
          name?: string | null
          opportunity_type?: string | null
          provider?: string | null
          v?: string | null
        }
        Relationships: []
      }
      package_documents: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          package_id: string
          required: boolean | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          package_id: string
          required?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          package_id?: string
          required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "package_documents_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_entity_types: {
        Row: {
          created_at: string | null
          entity_type: string
          id: string
          package_id: string
        }
        Insert: {
          created_at?: string | null
          entity_type: string
          id?: string
          package_id: string
        }
        Update: {
          created_at?: string | null
          entity_type?: string
          id?: string
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_entity_types_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_funding_services: {
        Row: {
          created_at: string | null
          funding_service_id: string
          id: string
          order_position: number | null
          package_id: string
        }
        Insert: {
          created_at?: string | null
          funding_service_id: string
          id?: string
          order_position?: number | null
          package_id: string
        }
        Update: {
          created_at?: string | null
          funding_service_id?: string
          id?: string
          order_position?: number | null
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_funding_services_funding_service_id_fkey"
            columns: ["funding_service_id"]
            referencedRelation: "funding_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_funding_services_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_opportunities: {
        Row: {
          created_at: string | null
          id: string
          opportunity_id: string
          order_position: number | null
          package_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          opportunity_id: string
          order_position?: number | null
          package_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          opportunity_id?: string
          order_position?: number | null
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_opportunities_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_services: {
        Row: {
          created_at: string | null
          id: string
          order_position: number | null
          package_id: string
          service_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_position?: number | null
          package_id: string
          service_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_position?: number | null
          package_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_services_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_services_service_id_fkey"
            columns: ["service_id"]
            referencedRelation: "support_services"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          active: boolean | null
          annual_compliance_services: string | null
          code: string
          cover_gif_path: string | null
          created_at: string | null
          description: string | null
          discount_percentage: number
          duration_months: number
          embedding: string | null
          entity_type: string
          featured: boolean | null
          final_price: number
          id: string
          metadata: Json | null
          min_people: number | null
          name: string
          plan_name: string
          price: number
          required_modules: string[] | null
          square_image_path: string | null
          total_govt_fee: number | null
          updated_at: string | null
          why_choose: string | null
        }
        Insert: {
          active?: boolean | null
          annual_compliance_services?: string | null
          code: string
          cover_gif_path?: string | null
          created_at?: string | null
          description?: string | null
          discount_percentage: number
          duration_months: number
          embedding?: string | null
          entity_type: string
          featured?: boolean | null
          final_price: number
          id?: string
          metadata?: Json | null
          min_people?: number | null
          name: string
          plan_name: string
          price: number
          required_modules?: string[] | null
          square_image_path?: string | null
          total_govt_fee?: number | null
          updated_at?: string | null
          why_choose?: string | null
        }
        Update: {
          active?: boolean | null
          annual_compliance_services?: string | null
          code?: string
          cover_gif_path?: string | null
          created_at?: string | null
          description?: string | null
          discount_percentage?: number
          duration_months?: number
          embedding?: string | null
          entity_type?: string
          featured?: boolean | null
          final_price?: number
          id?: string
          metadata?: Json | null
          min_people?: number | null
          name?: string
          plan_name?: string
          price?: number
          required_modules?: string[] | null
          square_image_path?: string | null
          total_govt_fee?: number | null
          updated_at?: string | null
          why_choose?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          bank_account_id: string | null
          contact_id: string
          created_at: string | null
          created_by: string
          date: string
          id: string
          invoice_id: string | null
          metadata: Json | null
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          amount: number
          bank_account_id?: string | null
          contact_id: string
          created_at?: string | null
          created_by: string
          date?: string
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          notes?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          contact_id?: string
          created_at?: string | null
          created_by?: string
          date?: string
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_entitlements: {
        Row: {
          bool_value: boolean | null
          id: string
          key: string
          num_value: number | null
          plan_id: string
          unlimited: boolean
        }
        Insert: {
          bool_value?: boolean | null
          id?: string
          key: string
          num_value?: number | null
          plan_id: string
          unlimited?: boolean
        }
        Update: {
          bool_value?: boolean | null
          id?: string
          key?: string
          num_value?: number | null
          plan_id?: string
          unlimited?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "plan_entitlements_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "platform_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_billing_incidents: {
        Row: {
          created_at: string
          detail: string | null
          id: string
          kind: string
          razorpay_ref: string | null
          resolved_at: string | null
          resolved_by: string | null
          workplace_id: string | null
        }
        Insert: {
          created_at?: string
          detail?: string | null
          id?: string
          kind: string
          razorpay_ref?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          workplace_id?: string | null
        }
        Update: {
          created_at?: string
          detail?: string | null
          id?: string
          kind?: string
          razorpay_ref?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_billing_incidents_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_plans: {
        Row: {
          annual_price_inr: number | null
          code: string
          created_at: string
          id: string
          is_active: boolean
          monthly_price_inr: number
          name: string
          razorpay_plan_id: string | null
          tier_level: number
          updated_at: string
        }
        Insert: {
          annual_price_inr?: number | null
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          monthly_price_inr?: number
          name: string
          razorpay_plan_id?: string | null
          tier_level: number
          updated_at?: string
        }
        Update: {
          annual_price_inr?: number | null
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          monthly_price_inr?: number
          name?: string
          razorpay_plan_id?: string | null
          tier_level?: number
          updated_at?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          bool_value: boolean
          key: string
          updated_at: string
        }
        Insert: {
          bool_value?: boolean
          key: string
          updated_at?: string
        }
        Update: {
          bool_value?: boolean
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      pos_held_transactions: {
        Row: {
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          discount_amount: number | null
          expires_at: string | null
          held_at: string | null
          held_by: string | null
          hold_number: string
          id: string
          items: Json
          notes: string | null
          recalled: boolean | null
          recalled_at: string | null
          recalled_to_transaction_id: string | null
          subtotal: number | null
          tax_total: number | null
          terminal_id: string
          total: number | null
          workplace_id: string
        }
        Insert: {
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          expires_at?: string | null
          held_at?: string | null
          held_by?: string | null
          hold_number: string
          id?: string
          items: Json
          notes?: string | null
          recalled?: boolean | null
          recalled_at?: string | null
          recalled_to_transaction_id?: string | null
          subtotal?: number | null
          tax_total?: number | null
          terminal_id: string
          total?: number | null
          workplace_id: string
        }
        Update: {
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          expires_at?: string | null
          held_at?: string | null
          held_by?: string | null
          hold_number?: string
          id?: string
          items?: Json
          notes?: string | null
          recalled?: boolean | null
          recalled_at?: string | null
          recalled_to_transaction_id?: string | null
          subtotal?: number | null
          tax_total?: number | null
          terminal_id?: string
          total?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_held_transactions_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_held_transactions_held_by_fkey"
            columns: ["held_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_held_transactions_recalled_to_transaction_id_fkey"
            columns: ["recalled_to_transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_held_transactions_terminal_id_fkey"
            columns: ["terminal_id"]
            referencedRelation: "pos_terminals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_held_transactions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_payments: {
        Row: {
          amount: number
          bank_account_id: string | null
          change_amount: number | null
          created_at: string | null
          id: string
          metadata: Json | null
          payment_date: string | null
          payment_method: string
          reference_number: string | null
          status: string | null
          tendered_amount: number | null
          transaction_id: string
        }
        Insert: {
          amount: number
          bank_account_id?: string | null
          change_amount?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          payment_date?: string | null
          payment_method: string
          reference_number?: string | null
          status?: string | null
          tendered_amount?: number | null
          transaction_id: string
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          change_amount?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          payment_date?: string | null
          payment_method?: string
          reference_number?: string | null
          status?: string | null
          tendered_amount?: number | null
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_payments_transaction_id_fkey"
            columns: ["transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_return_items: {
        Row: {
          barcode: string | null
          batch_id: string | null
          condition_notes: string | null
          created_at: string | null
          damage_write_off: boolean | null
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          item_condition: string
          line_return_amount: number
          location_id: string | null
          metadata: Json | null
          original_item_id: string | null
          product_id: string
          product_name: string
          quantity_original: number | null
          quantity_returned: number
          restock_approved: boolean | null
          restock_quantity: number | null
          return_id: string
          sku: string | null
          tax_rate: number | null
          unit_price: number
        }
        Insert: {
          barcode?: string | null
          batch_id?: string | null
          condition_notes?: string | null
          created_at?: string | null
          damage_write_off?: boolean | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          item_condition: string
          line_return_amount: number
          location_id?: string | null
          metadata?: Json | null
          original_item_id?: string | null
          product_id: string
          product_name: string
          quantity_original?: number | null
          quantity_returned: number
          restock_approved?: boolean | null
          restock_quantity?: number | null
          return_id: string
          sku?: string | null
          tax_rate?: number | null
          unit_price: number
        }
        Update: {
          barcode?: string | null
          batch_id?: string | null
          condition_notes?: string | null
          created_at?: string | null
          damage_write_off?: boolean | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          item_condition?: string
          line_return_amount?: number
          location_id?: string | null
          metadata?: Json | null
          original_item_id?: string | null
          product_id?: string
          product_name?: string
          quantity_original?: number | null
          quantity_returned?: number
          restock_approved?: boolean | null
          restock_quantity?: number | null
          return_id?: string
          sku?: string | null
          tax_rate?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "pos_return_items_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "inventory_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_items_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_items_original_item_id_fkey"
            columns: ["original_item_id"]
            referencedRelation: "pos_transaction_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_items_return_id_fkey"
            columns: ["return_id"]
            referencedRelation: "pos_returns"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_return_refund_evidence: {
        Row: {
          allocations: Json
          amount: number
          completed_at: string | null
          external_reference: string | null
          internal_reference: string
          original_tenders: Json
          provider_evidence: Json
          recorded_at: string
          recorded_by: string
          refund_method: string
          return_id: string
          status: string
          workplace_id: string
        }
        Insert: {
          allocations?: Json
          amount: number
          completed_at?: string | null
          external_reference?: string | null
          internal_reference: string
          original_tenders?: Json
          provider_evidence?: Json
          recorded_at?: string
          recorded_by: string
          refund_method: string
          return_id: string
          status: string
          workplace_id: string
        }
        Update: {
          allocations?: Json
          amount?: number
          completed_at?: string | null
          external_reference?: string | null
          internal_reference?: string
          original_tenders?: Json
          provider_evidence?: Json
          recorded_at?: string
          recorded_by?: string
          refund_method?: string
          return_id?: string
          status?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_return_refund_evidence_recorded_by_fkey"
            columns: ["recorded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_refund_evidence_return_id_fkey"
            columns: ["return_id"]
            referencedRelation: "pos_returns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_return_refund_evidence_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_returns: {
        Row: {
          attachments: Json | null
          created_at: string | null
          credit_note_generated: boolean | null
          credit_note_id: string | null
          customer_id: string | null
          draft_request_id: string | null
          exchange_amount: number | null
          exchange_invoice_id: string | null
          finalization_request_id: string | null
          finalized_at: string | null
          id: string
          metadata: Json | null
          net_refund_amount: number | null
          original_invoice_id: string | null
          original_invoice_number: string | null
          original_transaction_id: string | null
          processed_by: string
          refund_completed_at: string | null
          refund_method: string | null
          refund_status: string | null
          refunded_by: string | null
          return_date: string | null
          return_number: string
          return_reason_category: string | null
          return_reason_text: string | null
          return_type: string | null
          review_notes: string | null
          review_status: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          session_id: string | null
          status: string | null
          store_credit_amount: number | null
          store_credit_issued_id: string | null
          terminal_id: string | null
          total_return_amount: number | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          credit_note_generated?: boolean | null
          credit_note_id?: string | null
          customer_id?: string | null
          draft_request_id?: string | null
          exchange_amount?: number | null
          exchange_invoice_id?: string | null
          finalization_request_id?: string | null
          finalized_at?: string | null
          id?: string
          metadata?: Json | null
          net_refund_amount?: number | null
          original_invoice_id?: string | null
          original_invoice_number?: string | null
          original_transaction_id?: string | null
          processed_by: string
          refund_completed_at?: string | null
          refund_method?: string | null
          refund_status?: string | null
          refunded_by?: string | null
          return_date?: string | null
          return_number: string
          return_reason_category?: string | null
          return_reason_text?: string | null
          return_type?: string | null
          review_notes?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: string | null
          store_credit_amount?: number | null
          store_credit_issued_id?: string | null
          terminal_id?: string | null
          total_return_amount?: number | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          credit_note_generated?: boolean | null
          credit_note_id?: string | null
          customer_id?: string | null
          draft_request_id?: string | null
          exchange_amount?: number | null
          exchange_invoice_id?: string | null
          finalization_request_id?: string | null
          finalized_at?: string | null
          id?: string
          metadata?: Json | null
          net_refund_amount?: number | null
          original_invoice_id?: string | null
          original_invoice_number?: string | null
          original_transaction_id?: string | null
          processed_by?: string
          refund_completed_at?: string | null
          refund_method?: string | null
          refund_status?: string | null
          refunded_by?: string | null
          return_date?: string | null
          return_number?: string
          return_reason_category?: string | null
          return_reason_text?: string | null
          return_type?: string | null
          review_notes?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: string | null
          store_credit_amount?: number | null
          store_credit_issued_id?: string | null
          terminal_id?: string | null
          total_return_amount?: number | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pos_returns_store_credit"
            columns: ["store_credit_issued_id"]
            referencedRelation: "store_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_credit_note_id_fkey"
            columns: ["credit_note_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_exchange_invoice_id_fkey"
            columns: ["exchange_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_original_invoice_id_fkey"
            columns: ["original_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_original_transaction_id_fkey"
            columns: ["original_transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_processed_by_fkey"
            columns: ["processed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_refunded_by_fkey"
            columns: ["refunded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_reviewed_by_fkey"
            columns: ["reviewed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "pos_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_terminal_id_fkey"
            columns: ["terminal_id"]
            referencedRelation: "pos_terminals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_returns_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_sessions: {
        Row: {
          cash_difference: number | null
          closed_at: string | null
          closed_by: string | null
          closing_cash: number | null
          created_at: string | null
          expected_cash: number | null
          id: string
          notes: string | null
          opened_at: string | null
          opened_by: string | null
          opening_cash: number | null
          status: string | null
          terminal_id: string
          total_card_payments: number | null
          total_cash_payments: number | null
          total_other_payments: number | null
          total_refunds: number | null
          total_sales: number | null
          total_upi_payments: number | null
          transaction_count: number | null
          workplace_id: string
        }
        Insert: {
          cash_difference?: number | null
          closed_at?: string | null
          closed_by?: string | null
          closing_cash?: number | null
          created_at?: string | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          opened_by?: string | null
          opening_cash?: number | null
          status?: string | null
          terminal_id: string
          total_card_payments?: number | null
          total_cash_payments?: number | null
          total_other_payments?: number | null
          total_refunds?: number | null
          total_sales?: number | null
          total_upi_payments?: number | null
          transaction_count?: number | null
          workplace_id: string
        }
        Update: {
          cash_difference?: number | null
          closed_at?: string | null
          closed_by?: string | null
          closing_cash?: number | null
          created_at?: string | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          opened_by?: string | null
          opening_cash?: number | null
          status?: string | null
          terminal_id?: string
          total_card_payments?: number | null
          total_cash_payments?: number | null
          total_other_payments?: number | null
          total_refunds?: number | null
          total_sales?: number | null
          total_upi_payments?: number | null
          transaction_count?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_sessions_closed_by_fkey"
            columns: ["closed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_sessions_opened_by_fkey"
            columns: ["opened_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_sessions_terminal_id_fkey"
            columns: ["terminal_id"]
            referencedRelation: "pos_terminals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_sessions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_terminals: {
        Row: {
          created_at: string | null
          device_id: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          location_id: string | null
          settings: Json | null
          terminal_code: string
          terminal_name: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          location_id?: string | null
          settings?: Json | null
          terminal_code: string
          terminal_name: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          location_id?: string | null
          settings?: Json | null
          terminal_code?: string
          terminal_name?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_terminals_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_terminals_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_transaction_items: {
        Row: {
          barcode: string | null
          batch_id: string | null
          cgst_amount: number | null
          cgst_rate: number | null
          created_at: string | null
          description: string
          discount_amount: number | null
          discount_percentage: number | null
          hsn_sac: string | null
          id: string
          igst_amount: number | null
          igst_rate: number | null
          is_return: boolean | null
          line_total: number | null
          mrp: number | null
          product_id: string | null
          quantity: number | null
          return_reason: string | null
          serial_number: string | null
          sgst_amount: number | null
          sgst_rate: number | null
          sku: string | null
          tax_rate: number | null
          transaction_id: string
          unit: string | null
          unit_price: number | null
        }
        Insert: {
          barcode?: string | null
          batch_id?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          is_return?: boolean | null
          line_total?: number | null
          mrp?: number | null
          product_id?: string | null
          quantity?: number | null
          return_reason?: string | null
          serial_number?: string | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          sku?: string | null
          tax_rate?: number | null
          transaction_id: string
          unit?: string | null
          unit_price?: number | null
        }
        Update: {
          barcode?: string | null
          batch_id?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          is_return?: boolean | null
          line_total?: number | null
          mrp?: number | null
          product_id?: string | null
          quantity?: number | null
          return_reason?: string | null
          serial_number?: string | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          sku?: string | null
          tax_rate?: number | null
          transaction_id?: string
          unit?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pos_transaction_items_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "inventory_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transaction_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transaction_items_transaction_id_fkey"
            columns: ["transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      pos_transactions: {
        Row: {
          balance_due: number | null
          cgst_amount: number | null
          created_at: string | null
          created_by: string | null
          customer_gstin: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          discount_amount: number | null
          discount_type: string | null
          discount_value: number | null
          goods_delivered: boolean | null
          id: string
          igst_amount: number | null
          invoice_id: string | null
          is_synced: boolean | null
          location_id: string | null
          loyalty_tier_id: string | null
          notes: string | null
          original_transaction_id: string | null
          paid_amount: number | null
          payment_status: string | null
          round_off: number | null
          session_id: string | null
          sgst_amount: number | null
          subtotal: number | null
          tax_total: number | null
          terminal_id: string
          tier_discount_amount: number | null
          total: number | null
          transaction_number: string
          transaction_type: string | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          balance_due?: number | null
          cgst_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_gstin?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          goods_delivered?: boolean | null
          id?: string
          igst_amount?: number | null
          invoice_id?: string | null
          is_synced?: boolean | null
          location_id?: string | null
          loyalty_tier_id?: string | null
          notes?: string | null
          original_transaction_id?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          round_off?: number | null
          session_id?: string | null
          sgst_amount?: number | null
          subtotal?: number | null
          tax_total?: number | null
          terminal_id: string
          tier_discount_amount?: number | null
          total?: number | null
          transaction_number: string
          transaction_type?: string | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          balance_due?: number | null
          cgst_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_gstin?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          goods_delivered?: boolean | null
          id?: string
          igst_amount?: number | null
          invoice_id?: string | null
          is_synced?: boolean | null
          location_id?: string | null
          loyalty_tier_id?: string | null
          notes?: string | null
          original_transaction_id?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          round_off?: number | null
          session_id?: string | null
          sgst_amount?: number | null
          subtotal?: number | null
          tax_total?: number | null
          terminal_id?: string
          tier_discount_amount?: number | null
          total?: number | null
          transaction_number?: string
          transaction_type?: string | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_transactions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_loyalty_tier_id_fkey"
            columns: ["loyalty_tier_id"]
            referencedRelation: "loyalty_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_original_transaction_id_fkey"
            columns: ["original_transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "pos_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_terminal_id_fkey"
            columns: ["terminal_id"]
            referencedRelation: "pos_terminals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pos_transactions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          effective_date: string
          id: string
          notes: string | null
          price: number
          price_type: string
          product_id: string
          quantity: number | null
          source_id: string | null
          source_type: string | null
          vendor_id: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          id?: string
          notes?: string | null
          price: number
          price_type: string
          product_id: string
          quantity?: number | null
          source_id?: string | null
          source_type?: string | null
          vendor_id?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          id?: string
          notes?: string | null
          price?: number
          price_type?: string
          product_id?: string
          quantity?: number | null
          source_id?: string | null
          source_type?: string | null
          vendor_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_history_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      products_services: {
        Row: {
          additional_information: string | null
          barcode: string | null
          barcode_type: string | null
          category: string | null
          compliance_status: string | null
          cost_price: number | null
          created_at: string | null
          created_by: string
          default_tax_rate: number | null
          description: string | null
          exchange_window_days: number | null
          exchangeable: boolean | null
          hsn_sac: string | null
          id: string
          image_alt_text: string | null
          image_url: string | null
          is_pos_enabled: boolean | null
          is_service: boolean | null
          metadata: Json | null
          mrp: number | null
          name: string
          pictures: Json | null
          reorder_point: number | null
          return_notes: string | null
          return_window_days: number | null
          returnable: boolean | null
          sku: string | null
          tax_rate: number
          track_inventory: boolean | null
          type: string
          unit_price: number
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          additional_information?: string | null
          barcode?: string | null
          barcode_type?: string | null
          category?: string | null
          compliance_status?: string | null
          cost_price?: number | null
          created_at?: string | null
          created_by: string
          default_tax_rate?: number | null
          description?: string | null
          exchange_window_days?: number | null
          exchangeable?: boolean | null
          hsn_sac?: string | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          is_pos_enabled?: boolean | null
          is_service?: boolean | null
          metadata?: Json | null
          mrp?: number | null
          name: string
          pictures?: Json | null
          reorder_point?: number | null
          return_notes?: string | null
          return_window_days?: number | null
          returnable?: boolean | null
          sku?: string | null
          tax_rate?: number
          track_inventory?: boolean | null
          type: string
          unit_price?: number
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          additional_information?: string | null
          barcode?: string | null
          barcode_type?: string | null
          category?: string | null
          compliance_status?: string | null
          cost_price?: number | null
          created_at?: string | null
          created_by?: string
          default_tax_rate?: number | null
          description?: string | null
          exchange_window_days?: number | null
          exchangeable?: boolean | null
          hsn_sac?: string | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          is_pos_enabled?: boolean | null
          is_service?: boolean | null
          metadata?: Json | null
          mrp?: number | null
          name?: string
          pictures?: Json | null
          reorder_point?: number | null
          return_notes?: string | null
          return_window_days?: number | null
          returnable?: boolean | null
          sku?: string | null
          tax_rate?: number
          track_inventory?: boolean | null
          type?: string
          unit_price?: number
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_services_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_services_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          amplify_default: boolean | null
          anonymised_at: string | null
          auth_provider: string | null
          avatar_url: string | null
          created_at: string | null
          default_workplace: string | null
          deleted_at: string | null
          email: string
          google_id: string | null
          id: string
          name: string
          role: string | null
        }
        Insert: {
          amplify_default?: boolean | null
          anonymised_at?: string | null
          auth_provider?: string | null
          avatar_url?: string | null
          created_at?: string | null
          default_workplace?: string | null
          deleted_at?: string | null
          email: string
          google_id?: string | null
          id: string
          name: string
          role?: string | null
        }
        Update: {
          amplify_default?: boolean | null
          anonymised_at?: string | null
          auth_provider?: string | null
          avatar_url?: string | null
          created_at?: string | null
          default_workplace?: string | null
          deleted_at?: string | null
          email?: string
          google_id?: string | null
          id?: string
          name?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_default_workplace_fkey"
            columns: ["default_workplace"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_match_events: {
        Row: {
          amount_tolerance: number | null
          bill_scope_amount: number
          bill_scope_quantity: number
          bill_vs_grn_amount_variance: number
          bill_vs_grn_quantity_variance: number
          decision_status: string
          effective_at: string
          finality_status: string
          finalized_at: string
          finalized_by: string | null
          goods_receipt_note_id: string
          grn_scope_amount: number
          grn_scope_quantity: number
          grn_vs_po_amount_variance: number
          grn_vs_po_quantity_variance: number
          id: string
          idempotency_key: string
          maximum_grn_bill_unit_price_variance: number
          maximum_po_grn_unit_price_variance: number
          payload_hash: string
          po_scope_amount: number
          po_scope_quantity: number
          purchase_order_id: string
          quantity_tolerance: number | null
          recorded_at: string
          source_snapshot: Json
          source_version: number
          unit_price_tolerance: number | null
          vendor_bill_id: string
          workplace_id: string
        }
        Insert: {
          amount_tolerance?: number | null
          bill_scope_amount: number
          bill_scope_quantity: number
          bill_vs_grn_amount_variance: number
          bill_vs_grn_quantity_variance: number
          decision_status: string
          effective_at: string
          finality_status?: string
          finalized_at?: string
          finalized_by?: string | null
          goods_receipt_note_id: string
          grn_scope_amount: number
          grn_scope_quantity: number
          grn_vs_po_amount_variance: number
          grn_vs_po_quantity_variance: number
          id?: string
          idempotency_key: string
          maximum_grn_bill_unit_price_variance: number
          maximum_po_grn_unit_price_variance: number
          payload_hash: string
          po_scope_amount: number
          po_scope_quantity: number
          purchase_order_id: string
          quantity_tolerance?: number | null
          recorded_at?: string
          source_snapshot: Json
          source_version?: number
          unit_price_tolerance?: number | null
          vendor_bill_id: string
          workplace_id: string
        }
        Update: {
          amount_tolerance?: number | null
          bill_scope_amount?: number
          bill_scope_quantity?: number
          bill_vs_grn_amount_variance?: number
          bill_vs_grn_quantity_variance?: number
          decision_status?: string
          effective_at?: string
          finality_status?: string
          finalized_at?: string
          finalized_by?: string | null
          goods_receipt_note_id?: string
          grn_scope_amount?: number
          grn_scope_quantity?: number
          grn_vs_po_amount_variance?: number
          grn_vs_po_quantity_variance?: number
          id?: string
          idempotency_key?: string
          maximum_grn_bill_unit_price_variance?: number
          maximum_po_grn_unit_price_variance?: number
          payload_hash?: string
          po_scope_amount?: number
          po_scope_quantity?: number
          purchase_order_id?: string
          quantity_tolerance?: number | null
          recorded_at?: string
          source_snapshot?: Json
          source_version?: number
          unit_price_tolerance?: number | null
          vendor_bill_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_match_events_bill_workplace_fkey"
            columns: ["vendor_bill_id", "workplace_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "purchase_match_events_finalized_by_fkey"
            columns: ["finalized_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_match_events_grn_workplace_fkey"
            columns: ["goods_receipt_note_id", "workplace_id"]
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "purchase_match_events_po_workplace_fkey"
            columns: ["purchase_order_id", "workplace_id"]
            referencedRelation: "purchase_orders"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "purchase_match_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_match_lines: {
        Row: {
          bill_item_snapshot: Json
          bill_quantity: number
          bill_quantity_unit_amount: number
          bill_source_line_total: number
          bill_vs_grn_amount_variance: number
          bill_vs_grn_quantity_variance: number
          bill_vs_grn_unit_price_variance: number | null
          bill_weighted_tax_rate: number | null
          bill_weighted_unit_price: number | null
          goods_receipt_note_id: string
          grn_accepted_quantity: number
          grn_item_id: string
          grn_quantity_unit_amount: number
          grn_received_quantity: number
          grn_rejected_quantity: number
          grn_source_line_total: number | null
          grn_tax_rate: number | null
          grn_unit_price: number
          grn_vs_po_amount_variance: number
          grn_vs_po_quantity_variance: number
          grn_vs_po_unit_price_variance: number
          id: number
          match_event_id: string
          po_ordered_quantity: number
          po_quantity_unit_amount: number
          po_source_line_total: number | null
          po_tax_rate: number | null
          po_unit_price: number
          product_id: string | null
          purchase_order_id: string
          purchase_order_item_id: string
          vendor_bill_id: string
          vendor_bill_item_ids: string[]
          workplace_id: string
        }
        Insert: {
          bill_item_snapshot: Json
          bill_quantity: number
          bill_quantity_unit_amount: number
          bill_source_line_total: number
          bill_vs_grn_amount_variance: number
          bill_vs_grn_quantity_variance: number
          bill_vs_grn_unit_price_variance?: number | null
          bill_weighted_tax_rate?: number | null
          bill_weighted_unit_price?: number | null
          goods_receipt_note_id: string
          grn_accepted_quantity: number
          grn_item_id: string
          grn_quantity_unit_amount: number
          grn_received_quantity: number
          grn_rejected_quantity: number
          grn_source_line_total?: number | null
          grn_tax_rate?: number | null
          grn_unit_price: number
          grn_vs_po_amount_variance: number
          grn_vs_po_quantity_variance: number
          grn_vs_po_unit_price_variance: number
          id?: never
          match_event_id: string
          po_ordered_quantity: number
          po_quantity_unit_amount: number
          po_source_line_total?: number | null
          po_tax_rate?: number | null
          po_unit_price: number
          product_id?: string | null
          purchase_order_id: string
          purchase_order_item_id: string
          vendor_bill_id: string
          vendor_bill_item_ids?: string[]
          workplace_id: string
        }
        Update: {
          bill_item_snapshot?: Json
          bill_quantity?: number
          bill_quantity_unit_amount?: number
          bill_source_line_total?: number
          bill_vs_grn_amount_variance?: number
          bill_vs_grn_quantity_variance?: number
          bill_vs_grn_unit_price_variance?: number | null
          bill_weighted_tax_rate?: number | null
          bill_weighted_unit_price?: number | null
          goods_receipt_note_id?: string
          grn_accepted_quantity?: number
          grn_item_id?: string
          grn_quantity_unit_amount?: number
          grn_received_quantity?: number
          grn_rejected_quantity?: number
          grn_source_line_total?: number | null
          grn_tax_rate?: number | null
          grn_unit_price?: number
          grn_vs_po_amount_variance?: number
          grn_vs_po_quantity_variance?: number
          grn_vs_po_unit_price_variance?: number
          id?: never
          match_event_id?: string
          po_ordered_quantity?: number
          po_quantity_unit_amount?: number
          po_source_line_total?: number | null
          po_tax_rate?: number | null
          po_unit_price?: number
          product_id?: string | null
          purchase_order_id?: string
          purchase_order_item_id?: string
          vendor_bill_id?: string
          vendor_bill_item_ids?: string[]
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_match_lines_event_source_fkey"
            columns: [
              "match_event_id",
              "workplace_id",
              "purchase_order_id",
              "goods_receipt_note_id",
              "vendor_bill_id",
            ]
            referencedRelation: "purchase_match_events"
            referencedColumns: [
              "id",
              "workplace_id",
              "purchase_order_id",
              "goods_receipt_note_id",
              "vendor_bill_id",
            ]
          },
          {
            foreignKeyName: "purchase_match_lines_grn_item_source_fkey"
            columns: ["grn_item_id", "goods_receipt_note_id"]
            referencedRelation: "grn_items"
            referencedColumns: ["id", "grn_id"]
          },
          {
            foreignKeyName: "purchase_match_lines_po_item_source_fkey"
            columns: ["purchase_order_item_id", "purchase_order_id"]
            referencedRelation: "purchase_order_items"
            referencedColumns: ["id", "po_id"]
          },
          {
            foreignKeyName: "purchase_match_lines_product_workplace_fkey"
            columns: ["product_id", "workplace_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id", "workplace_id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          cgst_amount: number | null
          cgst_rate: number | null
          created_at: string | null
          description: string
          discount_amount: number | null
          discount_percentage: number | null
          hsn_sac: string | null
          id: string
          igst_amount: number | null
          igst_rate: number | null
          line_total: number | null
          notes: string | null
          pending_quantity: number | null
          po_id: string
          product_id: string | null
          quantity: number | null
          received_quantity: number | null
          sgst_amount: number | null
          sgst_rate: number | null
          sku: string | null
          tax_rate: number | null
          unit: string | null
          unit_price: number | null
        }
        Insert: {
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          line_total?: number | null
          notes?: string | null
          pending_quantity?: number | null
          po_id: string
          product_id?: string | null
          quantity?: number | null
          received_quantity?: number | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          sku?: string | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Update: {
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          line_total?: number | null
          notes?: string | null
          pending_quantity?: number | null
          po_id?: string
          product_id?: string | null
          quantity?: number | null
          received_quantity?: number | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          sku?: string | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_po_id_fkey"
            columns: ["po_id"]
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          attachment_urls: Json | null
          cgst_amount: number | null
          confirmed_at: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          delivery_address: string | null
          delivery_location_id: string | null
          discount_amount: number | null
          discount_type: string | null
          discount_value: number | null
          expected_delivery_date: string | null
          id: string
          igst_amount: number | null
          internal_notes: string | null
          notes: string | null
          payment_terms: string | null
          po_date: string | null
          po_number: string
          sent_at: string | null
          sgst_amount: number | null
          shipping_charges: number | null
          status: string | null
          subtotal: number | null
          tax_total: number | null
          terms_and_conditions: string | null
          total: number | null
          updated_at: string | null
          vendor_id: string | null
          vendor_reference: string | null
          workplace_id: string
        }
        Insert: {
          attachment_urls?: Json | null
          cgst_amount?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          delivery_address?: string | null
          delivery_location_id?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          expected_delivery_date?: string | null
          id?: string
          igst_amount?: number | null
          internal_notes?: string | null
          notes?: string | null
          payment_terms?: string | null
          po_date?: string | null
          po_number: string
          sent_at?: string | null
          sgst_amount?: number | null
          shipping_charges?: number | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          terms_and_conditions?: string | null
          total?: number | null
          updated_at?: string | null
          vendor_id?: string | null
          vendor_reference?: string | null
          workplace_id: string
        }
        Update: {
          attachment_urls?: Json | null
          cgst_amount?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          delivery_address?: string | null
          delivery_location_id?: string | null
          discount_amount?: number | null
          discount_type?: string | null
          discount_value?: number | null
          expected_delivery_date?: string | null
          id?: string
          igst_amount?: number | null
          internal_notes?: string | null
          notes?: string | null
          payment_terms?: string | null
          po_date?: string | null
          po_number?: string
          sent_at?: string | null
          sgst_amount?: number | null
          shipping_charges?: number | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          terms_and_conditions?: string | null
          total?: number | null
          updated_at?: string | null
          vendor_id?: string | null
          vendor_reference?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_delivery_location_id_fkey"
            columns: ["delivery_location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          disabled_at: string | null
          endpoint: string
          expires_at: string | null
          failure_count: number
          id: string
          last_failure_at: string | null
          last_seen_at: string
          next_retry_at: string | null
          p256dh: string
          profile_id: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          auth_key: string
          created_at?: string
          disabled_at?: string | null
          endpoint: string
          expires_at?: string | null
          failure_count?: number
          id?: string
          last_failure_at?: string | null
          last_seen_at?: string
          next_retry_at?: string | null
          p256dh: string
          profile_id: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          auth_key?: string
          created_at?: string
          disabled_at?: string | null
          endpoint?: string
          expires_at?: string | null
          failure_count?: number
          id?: string
          last_failure_at?: string | null
          last_seen_at?: string
          next_retry_at?: string | null
          p256dh?: string
          profile_id?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      quota_overrides: {
        Row: {
          bool_value: boolean | null
          created_at: string
          expires_at: string | null
          id: string
          key: string
          num_value: number | null
          reason: string | null
          unlimited: boolean
          workplace_id: string
        }
        Insert: {
          bool_value?: boolean | null
          created_at?: string
          expires_at?: string | null
          id?: string
          key: string
          num_value?: number | null
          reason?: string | null
          unlimited?: boolean
          workplace_id: string
        }
        Update: {
          bool_value?: boolean | null
          created_at?: string
          expires_at?: string | null
          id?: string
          key?: string
          num_value?: number | null
          reason?: string | null
          unlimited?: boolean
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quota_overrides_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      razorpay_webhook_events: {
        Row: {
          error: string | null
          event_id: string
          event_type: string | null
          outcome: string | null
          payload: Json | null
          payment_link_id: string | null
          processed_at: string
          workplace_id: string | null
        }
        Insert: {
          error?: string | null
          event_id: string
          event_type?: string | null
          outcome?: string | null
          payload?: Json | null
          payment_link_id?: string | null
          processed_at?: string
          workplace_id?: string | null
        }
        Update: {
          error?: string | null
          event_id?: string
          event_type?: string | null
          outcome?: string | null
          payload?: Json | null
          payment_link_id?: string | null
          processed_at?: string
          workplace_id?: string | null
        }
        Relationships: []
      }
      receipt_vouchers: {
        Row: {
          amount: number
          cgst_amount: number
          created_at: string
          created_by: string | null
          customer_gstin: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          gst_applicable: boolean
          id: string
          igst_amount: number
          is_for_service: boolean
          notes: string | null
          payment_method: string
          pos_payment_id: string | null
          pos_transaction_id: string
          receipt_date: string
          receipt_number: string
          reference_number: string | null
          sgst_amount: number
          updated_at: string
          workplace_id: string
        }
        Insert: {
          amount: number
          cgst_amount?: number
          created_at?: string
          created_by?: string | null
          customer_gstin?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          gst_applicable?: boolean
          id?: string
          igst_amount?: number
          is_for_service?: boolean
          notes?: string | null
          payment_method: string
          pos_payment_id?: string | null
          pos_transaction_id: string
          receipt_date?: string
          receipt_number: string
          reference_number?: string | null
          sgst_amount?: number
          updated_at?: string
          workplace_id: string
        }
        Update: {
          amount?: number
          cgst_amount?: number
          created_at?: string
          created_by?: string | null
          customer_gstin?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          gst_applicable?: boolean
          id?: string
          igst_amount?: number
          is_for_service?: boolean
          notes?: string | null
          payment_method?: string
          pos_payment_id?: string | null
          pos_transaction_id?: string
          receipt_date?: string
          receipt_number?: string
          reference_number?: string | null
          sgst_amount?: number
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receipt_vouchers_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipt_vouchers_pos_payment_id_fkey"
            columns: ["pos_payment_id"]
            referencedRelation: "pos_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipt_vouchers_pos_transaction_id_fkey"
            columns: ["pos_transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipt_vouchers_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      reconciliation_rules: {
        Row: {
          action: string
          created_at: string | null
          created_by: string
          criteria_json: Json
          id: string
          name: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          created_by: string
          criteria_json: Json
          id?: string
          name: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          created_by?: string
          criteria_json?: Json
          id?: string
          name?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reconciliation_rules_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reconciliation_rules_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      recurrence_history: {
        Row: {
          created_at: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          run_date: string
          schedule_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          run_date: string
          schedule_id: string
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          run_date?: string
          schedule_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurrence_history_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurrence_history_schedule_id_fkey"
            columns: ["schedule_id"]
            referencedRelation: "recurrence_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      recurrence_schedules: {
        Row: {
          auto_send: boolean | null
          contact_id: string
          created_at: string | null
          created_by: string
          end_date: string | null
          frequency: Database["public"]["Enums"]["recurrence_frequency"]
          id: string
          invoice_data: Json | null
          invoice_template_id: string | null
          metadata: Json | null
          name: string | null
          next_run: string
          start_date: string
          status: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          auto_send?: boolean | null
          contact_id: string
          created_at?: string | null
          created_by: string
          end_date?: string | null
          frequency: Database["public"]["Enums"]["recurrence_frequency"]
          id?: string
          invoice_data?: Json | null
          invoice_template_id?: string | null
          metadata?: Json | null
          name?: string | null
          next_run: string
          start_date: string
          status?: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          auto_send?: boolean | null
          contact_id?: string
          created_at?: string | null
          created_by?: string
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["recurrence_frequency"]
          id?: string
          invoice_data?: Json | null
          invoice_template_id?: string | null
          metadata?: Json | null
          name?: string | null
          next_run?: string
          start_date?: string
          status?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_invoice_template"
            columns: ["invoice_template_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurrence_schedules_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurrence_schedules_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_invoice_runs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          invoice_id: string | null
          recurring_invoice_id: string
          run_date: string
          status: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string | null
          recurring_invoice_id: string
          run_date?: string
          status: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string | null
          recurring_invoice_id?: string
          run_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_invoice_runs_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_invoice_runs_recurring_invoice_id_fkey"
            columns: ["recurring_invoice_id"]
            referencedRelation: "recurring_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_invoices: {
        Row: {
          auto_send: boolean | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          day_of_month: number | null
          day_of_week: number | null
          default_tax_rate: number | null
          discount_type: string | null
          discount_value: number | null
          email_template_id: string | null
          end_date: string | null
          frequency: string
          id: string
          interval_count: number | null
          invoice_type: string | null
          invoices_generated: number | null
          is_active: boolean | null
          last_run_date: string | null
          line_items: Json
          max_invoices: number | null
          next_run_date: string
          notes: string | null
          send_days_before: number | null
          start_date: string
          status: string | null
          tax_inclusive: boolean | null
          template_invoice_id: string | null
          terms: string | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          auto_send?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          created_by: string
          day_of_month?: number | null
          day_of_week?: number | null
          default_tax_rate?: number | null
          discount_type?: string | null
          discount_value?: number | null
          email_template_id?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          interval_count?: number | null
          invoice_type?: string | null
          invoices_generated?: number | null
          is_active?: boolean | null
          last_run_date?: string | null
          line_items?: Json
          max_invoices?: number | null
          next_run_date: string
          notes?: string | null
          send_days_before?: number | null
          start_date: string
          status?: string | null
          tax_inclusive?: boolean | null
          template_invoice_id?: string | null
          terms?: string | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          auto_send?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          day_of_month?: number | null
          day_of_week?: number | null
          default_tax_rate?: number | null
          discount_type?: string | null
          discount_value?: number | null
          email_template_id?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          interval_count?: number | null
          invoice_type?: string | null
          invoices_generated?: number | null
          is_active?: boolean | null
          last_run_date?: string | null
          line_items?: Json
          max_invoices?: number | null
          next_run_date?: string
          notes?: string | null
          send_days_before?: number | null
          start_date?: string
          status?: string | null
          tax_inclusive?: boolean | null
          template_invoice_id?: string | null
          terms?: string | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_invoices_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_invoices_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_invoices_template_invoice_id_fkey"
            columns: ["template_invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_invoices_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      reminder_automation: {
        Row: {
          contact_id: string
          created_at: string | null
          created_by: string
          days_after: number | null
          days_before: number | null
          id: string
          invoice_id: string | null
          last_sent: string | null
          message_template: string | null
          status: string
          type: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          created_by: string
          days_after?: number | null
          days_before?: number | null
          id?: string
          invoice_id?: string | null
          last_sent?: string | null
          message_template?: string | null
          status?: string
          type: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          created_by?: string
          days_after?: number | null
          days_before?: number | null
          id?: string
          invoice_id?: string | null
          last_sent?: string | null
          message_template?: string | null
          status?: string
          type?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminder_automation_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminder_automation_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminder_automation_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminder_automation_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_bookings: {
        Row: {
          adults: number
          booking_number: string | null
          check_in: string
          check_out: string
          children: number
          contact_id: string | null
          created_at: string
          created_by: string | null
          deposit_amount: number
          folio_total: number
          guest_email: string | null
          guest_name: string
          guest_phone: string | null
          id: string
          invoice_id: string | null
          metadata: Json
          nightly_rate: number
          notes: string | null
          property_id: string
          source: string | null
          status: string
          tax_rate: number
          unit_id: string | null
          unit_type_id: string | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          adults?: number
          booking_number?: string | null
          check_in: string
          check_out: string
          children?: number
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deposit_amount?: number
          folio_total?: number
          guest_email?: string | null
          guest_name: string
          guest_phone?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json
          nightly_rate?: number
          notes?: string | null
          property_id: string
          source?: string | null
          status?: string
          tax_rate?: number
          unit_id?: string | null
          unit_type_id?: string | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          adults?: number
          booking_number?: string | null
          check_in?: string
          check_out?: string
          children?: number
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deposit_amount?: number
          folio_total?: number
          guest_email?: string | null
          guest_name?: string
          guest_phone?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json
          nightly_rate?: number
          notes?: string | null
          property_id?: string
          source?: string | null
          status?: string
          tax_rate?: number
          unit_id?: string | null
          unit_type_id?: string | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_bookings_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "rental_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_unit_id_fkey"
            columns: ["unit_id"]
            referencedRelation: "rental_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_unit_type_id_fkey"
            columns: ["unit_type_id"]
            referencedRelation: "rental_unit_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_properties: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          created_by: string | null
          gstin: string | null
          id: string
          location_id: string | null
          metadata: Json
          name: string
          property_type: string
          state_code: string | null
          status: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          gstin?: string | null
          id?: string
          location_id?: string | null
          metadata?: Json
          name: string
          property_type?: string
          state_code?: string | null
          status?: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          gstin?: string | null
          id?: string
          location_id?: string | null
          metadata?: Json
          name?: string
          property_type?: string
          state_code?: string | null
          status?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_properties_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_properties_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_unit_types: {
        Row: {
          base_rate: number
          capacity: number
          created_at: string
          id: string
          metadata: Json
          name: string
          product_id: string | null
          property_id: string
          tax_rate: number
          updated_at: string
          workplace_id: string
        }
        Insert: {
          base_rate?: number
          capacity?: number
          created_at?: string
          id?: string
          metadata?: Json
          name: string
          product_id?: string | null
          property_id: string
          tax_rate?: number
          updated_at?: string
          workplace_id: string
        }
        Update: {
          base_rate?: number
          capacity?: number
          created_at?: string
          id?: string
          metadata?: Json
          name?: string
          product_id?: string | null
          property_id?: string
          tax_rate?: number
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_unit_types_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_unit_types_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "rental_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_unit_types_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_units: {
        Row: {
          created_at: string
          display_name: string | null
          floor: string | null
          id: string
          metadata: Json
          property_id: string
          status: string
          unit_number: string
          unit_type_id: string | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          floor?: string | null
          id?: string
          metadata?: Json
          property_id: string
          status?: string
          unit_number: string
          unit_type_id?: string | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          floor?: string | null
          id?: string
          metadata?: Json
          property_id?: string
          status?: string
          unit_number?: string
          unit_type_id?: string | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_units_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "rental_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_units_unit_type_id_fkey"
            columns: ["unit_type_id"]
            referencedRelation: "rental_unit_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_units_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      report_snapshots: {
        Row: {
          comparison_data: Json | null
          comparison_period_end: string | null
          comparison_period_start: string | null
          created_at: string | null
          excel_url: string | null
          financial_year: string
          generated_at: string
          generated_by: string
          gst_portal_format: Json | null
          id: string
          json_url: string | null
          parameters: Json | null
          pdf_url: string | null
          period_end: string
          period_start: string
          report_data: Json
          report_name: string
          report_type: string
          workplace_id: string
        }
        Insert: {
          comparison_data?: Json | null
          comparison_period_end?: string | null
          comparison_period_start?: string | null
          created_at?: string | null
          excel_url?: string | null
          financial_year: string
          generated_at?: string
          generated_by: string
          gst_portal_format?: Json | null
          id?: string
          json_url?: string | null
          parameters?: Json | null
          pdf_url?: string | null
          period_end: string
          period_start: string
          report_data: Json
          report_name: string
          report_type: string
          workplace_id: string
        }
        Update: {
          comparison_data?: Json | null
          comparison_period_end?: string | null
          comparison_period_start?: string | null
          created_at?: string | null
          excel_url?: string | null
          financial_year?: string
          generated_at?: string
          generated_by?: string
          gst_portal_format?: Json | null
          id?: string
          json_url?: string | null
          parameters?: Json | null
          pdf_url?: string | null
          period_end?: string
          period_start?: string
          report_data?: Json
          report_name?: string
          report_type?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_snapshots_generated_by_fkey"
            columns: ["generated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_snapshots_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_mappings: {
        Row: {
          conditions: Json | null
          created_at: string | null
          created_by: string | null
          entity_type_id: string | null
          id: string
          industry_id: string | null
          is_active: boolean | null
          logic_migration_status: string
          logic_model_version: number
          obligation_type: string | null
          package_id: string | null
          rule_id: string | null
          sub_industry_id: string | null
          support_service_id: string | null
          trigger_groups: Json
        }
        Insert: {
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          entity_type_id?: string | null
          id?: string
          industry_id?: string | null
          is_active?: boolean | null
          logic_migration_status?: string
          logic_model_version?: number
          obligation_type?: string | null
          package_id?: string | null
          rule_id?: string | null
          sub_industry_id?: string | null
          support_service_id?: string | null
          trigger_groups?: Json
        }
        Update: {
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          entity_type_id?: string | null
          id?: string
          industry_id?: string | null
          is_active?: boolean | null
          logic_migration_status?: string
          logic_model_version?: number
          obligation_type?: string | null
          package_id?: string | null
          rule_id?: string | null
          sub_industry_id?: string | null
          support_service_id?: string | null
          trigger_groups?: Json
        }
        Relationships: [
          {
            foreignKeyName: "rule_mappings_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_industry_id_fkey"
            columns: ["industry_id"]
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_rule_id_fkey"
            columns: ["rule_id"]
            referencedRelation: "compliance_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_sub_industry_id_fkey"
            columns: ["sub_industry_id"]
            referencedRelation: "sub_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_mappings_support_service_id_fkey"
            columns: ["support_service_id"]
            referencedRelation: "support_services"
            referencedColumns: ["id"]
          },
        ]
      }
      sla_config: {
        Row: {
          created_at: string | null
          escalation_after_hours: number | null
          first_response_hours: number
          id: string
          is_active: boolean | null
          priority: string
          resolution_hours: number
          service_category: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          escalation_after_hours?: number | null
          first_response_hours: number
          id?: string
          is_active?: boolean | null
          priority: string
          resolution_hours: number
          service_category?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          escalation_after_hours?: number | null
          first_response_hours?: number
          id?: string
          is_active?: boolean | null
          priority?: string
          resolution_hours?: number
          service_category?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      specific_activities: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          workplace_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          workplace_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "specific_activities_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          balance_type: string
          created_at: string | null
          current_balance: number | null
          department: string | null
          designation: string | null
          employee_id: string | null
          employment_type: string | null
          id: string
          location_id: string | null
          name: string
          opening_balance: number
          pan_number: string | null
          payout_type: string
          phone: string
          profile_id: string | null
          salary: number
          start_date: string | null
          status: string | null
          uan_number: string | null
          workplace_id: string
        }
        Insert: {
          balance_type: string
          created_at?: string | null
          current_balance?: number | null
          department?: string | null
          designation?: string | null
          employee_id?: string | null
          employment_type?: string | null
          id?: string
          location_id?: string | null
          name: string
          opening_balance: number
          pan_number?: string | null
          payout_type: string
          phone: string
          profile_id?: string | null
          salary: number
          start_date?: string | null
          status?: string | null
          uan_number?: string | null
          workplace_id: string
        }
        Update: {
          balance_type?: string
          created_at?: string | null
          current_balance?: number | null
          department?: string | null
          designation?: string | null
          employee_id?: string | null
          employment_type?: string | null
          id?: string
          location_id?: string | null
          name?: string
          opening_balance?: number
          pan_number?: string | null
          payout_type?: string
          phone?: string
          profile_id?: string | null
          salary?: number
          start_date?: string | null
          status?: string | null
          uan_number?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_payments: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          balance_after: number | null
          balance_before: number | null
          bank_account_id: string | null
          basic_salary: number | null
          created_at: string | null
          created_by: string
          days_worked: number | null
          deduction_notes: string | null
          esi_amount: number | null
          gross_amount: number | null
          hra: number | null
          id: string
          net_amount: number | null
          notes: string | null
          other_deductions: number | null
          overtime_amount: number | null
          overtime_hours: number | null
          payment_date: string
          payment_method: string | null
          payment_type: string
          payroll_month: string | null
          payslip_status: string | null
          period_end: string | null
          period_start: string | null
          pf_amount: number | null
          professional_tax: number | null
          reference_number: string | null
          sent_at: string | null
          special_allowance: number | null
          staff_id: string
          status: string | null
          tds_amount: number | null
          total_deductions: number | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          balance_after?: number | null
          balance_before?: number | null
          bank_account_id?: string | null
          basic_salary?: number | null
          created_at?: string | null
          created_by: string
          days_worked?: number | null
          deduction_notes?: string | null
          esi_amount?: number | null
          gross_amount?: number | null
          hra?: number | null
          id?: string
          net_amount?: number | null
          notes?: string | null
          other_deductions?: number | null
          overtime_amount?: number | null
          overtime_hours?: number | null
          payment_date: string
          payment_method?: string | null
          payment_type: string
          payroll_month?: string | null
          payslip_status?: string | null
          period_end?: string | null
          period_start?: string | null
          pf_amount?: number | null
          professional_tax?: number | null
          reference_number?: string | null
          sent_at?: string | null
          special_allowance?: number | null
          staff_id: string
          status?: string | null
          tds_amount?: number | null
          total_deductions?: number | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          balance_after?: number | null
          balance_before?: number | null
          bank_account_id?: string | null
          basic_salary?: number | null
          created_at?: string | null
          created_by?: string
          days_worked?: number | null
          deduction_notes?: string | null
          esi_amount?: number | null
          gross_amount?: number | null
          hra?: number | null
          id?: string
          net_amount?: number | null
          notes?: string | null
          other_deductions?: number | null
          overtime_amount?: number | null
          overtime_hours?: number | null
          payment_date?: string
          payment_method?: string | null
          payment_type?: string
          payroll_month?: string | null
          payslip_status?: string | null
          period_end?: string | null
          period_start?: string | null
          pf_amount?: number | null
          professional_tax?: number | null
          reference_number?: string | null
          sent_at?: string | null
          special_allowance?: number | null
          staff_id?: string
          status?: string | null
          tds_amount?: number | null
          total_deductions?: number | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_payments_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_payments_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_payments_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff_payment_summary"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "staff_payments_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_payroll_schedules: {
        Row: {
          created_at: string
          created_by: string | null
          day_of_month: number
          frequency: string
          id: string
          is_active: boolean
          last_run_date: string | null
          next_run_date: string
          notes: string | null
          salary_breakdown: Json
          staff_id: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          day_of_month?: number
          frequency?: string
          id?: string
          is_active?: boolean
          last_run_date?: string | null
          next_run_date: string
          notes?: string | null
          salary_breakdown?: Json
          staff_id: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          day_of_month?: number
          frequency?: string
          id?: string
          is_active?: boolean
          last_run_date?: string | null
          next_run_date?: string
          notes?: string | null
          salary_breakdown?: Json
          staff_id?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_payroll_schedules_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_payroll_schedules_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff_payment_summary"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "staff_payroll_schedules_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_take_items: {
        Row: {
          barcode: string | null
          batch_id: string | null
          batch_number: string | null
          counted_at: string | null
          counted_by: string | null
          counted_quantity: number | null
          id: string
          is_verified: boolean | null
          notes: string | null
          product_id: string | null
          product_name: string | null
          sku: string | null
          stock_take_id: string
          system_quantity: number | null
          unit_cost: number | null
          variance_quantity: number | null
          variance_value: number | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          barcode?: string | null
          batch_id?: string | null
          batch_number?: string | null
          counted_at?: string | null
          counted_by?: string | null
          counted_quantity?: number | null
          id?: string
          is_verified?: boolean | null
          notes?: string | null
          product_id?: string | null
          product_name?: string | null
          sku?: string | null
          stock_take_id: string
          system_quantity?: number | null
          unit_cost?: number | null
          variance_quantity?: number | null
          variance_value?: number | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          barcode?: string | null
          batch_id?: string | null
          batch_number?: string | null
          counted_at?: string | null
          counted_by?: string | null
          counted_quantity?: number | null
          id?: string
          is_verified?: boolean | null
          notes?: string | null
          product_id?: string | null
          product_name?: string | null
          sku?: string | null
          stock_take_id?: string
          system_quantity?: number | null
          unit_cost?: number | null
          variance_quantity?: number | null
          variance_value?: number | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_take_items_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "inventory_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_take_items_counted_by_fkey"
            columns: ["counted_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_take_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_take_items_stock_take_id_fkey"
            columns: ["stock_take_id"]
            referencedRelation: "stock_takes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_take_items_verified_by_fkey"
            columns: ["verified_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_takes: {
        Row: {
          adjustment_posted: boolean | null
          approved_at: string | null
          approved_by: string | null
          completed_at: string | null
          completed_by: string | null
          created_at: string | null
          description: string | null
          id: string
          location_id: string | null
          notes: string | null
          started_at: string | null
          started_by: string | null
          status: string | null
          take_date: string | null
          take_number: string
          total_items_counted: number | null
          total_variance_quantity: number | null
          total_variance_value: number | null
          workplace_id: string
        }
        Insert: {
          adjustment_posted?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          started_at?: string | null
          started_by?: string | null
          status?: string | null
          take_date?: string | null
          take_number: string
          total_items_counted?: number | null
          total_variance_quantity?: number | null
          total_variance_value?: number | null
          workplace_id: string
        }
        Update: {
          adjustment_posted?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          started_at?: string | null
          started_by?: string | null
          status?: string | null
          take_date?: string | null
          take_number?: string
          total_items_counted?: number | null
          total_variance_quantity?: number | null
          total_variance_value?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_takes_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_takes_completed_by_fkey"
            columns: ["completed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_takes_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_takes_started_by_fkey"
            columns: ["started_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_takes_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      store_credit_transactions: {
        Row: {
          amount: number
          balance_after: number
          balance_before: number
          id: string
          invoice_id: string | null
          metadata: Json | null
          notes: string | null
          pos_transaction_id: string | null
          processed_by: string | null
          store_credit_id: string
          transaction_date: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          balance_after: number
          balance_before: number
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          notes?: string | null
          pos_transaction_id?: string | null
          processed_by?: string | null
          store_credit_id: string
          transaction_date?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          balance_after?: number
          balance_before?: number
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          notes?: string | null
          pos_transaction_id?: string | null
          processed_by?: string | null
          store_credit_id?: string
          transaction_date?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_credit_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_credit_transactions_pos_transaction_id_fkey"
            columns: ["pos_transaction_id"]
            referencedRelation: "pos_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_credit_transactions_processed_by_fkey"
            columns: ["processed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_credit_transactions_store_credit_id_fkey"
            columns: ["store_credit_id"]
            referencedRelation: "store_credits"
            referencedColumns: ["id"]
          },
        ]
      }
      store_credits: {
        Row: {
          created_at: string | null
          credit_number: string
          current_balance: number
          customer_id: string
          expiry_date: string | null
          expiry_days: number | null
          id: string
          issued_by: string | null
          issued_date: string | null
          metadata: Json | null
          notes: string | null
          original_amount: number
          source_id: string | null
          source_reference: string | null
          source_type: string
          status: string | null
          updated_at: string | null
          used_amount: number | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          credit_number: string
          current_balance?: number
          customer_id: string
          expiry_date?: string | null
          expiry_days?: number | null
          id?: string
          issued_by?: string | null
          issued_date?: string | null
          metadata?: Json | null
          notes?: string | null
          original_amount: number
          source_id?: string | null
          source_reference?: string | null
          source_type: string
          status?: string | null
          updated_at?: string | null
          used_amount?: number | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          credit_number?: string
          current_balance?: number
          customer_id?: string
          expiry_date?: string | null
          expiry_days?: number | null
          id?: string
          issued_by?: string | null
          issued_date?: string | null
          metadata?: Json | null
          notes?: string | null
          original_amount?: number
          source_id?: string | null
          source_reference?: string | null
          source_type?: string
          status?: string | null
          updated_at?: string | null
          used_amount?: number | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_credits_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_credits_issued_by_fkey"
            columns: ["issued_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_credits_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_industries: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          industry_id: string | null
          is_active: boolean | null
          name: string
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          industry_id?: string | null
          is_active?: boolean | null
          name: string
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          industry_id?: string | null
          is_active?: boolean | null
          name?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_industries_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_industries_industry_id_fkey"
            columns: ["industry_id"]
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_billing_runs: {
        Row: {
          created_at: string
          failure_reason: string | null
          id: string
          idempotency_key: string
          invoice_id: string | null
          metadata: Json
          period_end: string | null
          period_start: string | null
          run_date: string
          status: string
          subscription_id: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          failure_reason?: string | null
          id?: string
          idempotency_key: string
          invoice_id?: string | null
          metadata?: Json
          period_end?: string | null
          period_start?: string | null
          run_date?: string
          status?: string
          subscription_id: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          failure_reason?: string | null
          id?: string
          idempotency_key?: string
          invoice_id?: string | null
          metadata?: Json
          period_end?: string | null
          period_start?: string | null
          run_date?: string
          status?: string
          subscription_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_billing_runs_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_billing_runs_subscription_id_fkey"
            columns: ["subscription_id"]
            referencedRelation: "customer_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_billing_runs_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          billing_interval: string
          code: string | null
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          hsn_sac: string | null
          id: string
          interval_count: number
          metadata: Json
          name: string
          product_id: string | null
          setup_fee: number
          status: string
          tax_rate: number
          trial_days: number
          unit_amount: number
          updated_at: string
          workplace_id: string
        }
        Insert: {
          billing_interval?: string
          code?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          hsn_sac?: string | null
          id?: string
          interval_count?: number
          metadata?: Json
          name: string
          product_id?: string | null
          setup_fee?: number
          status?: string
          tax_rate?: number
          trial_days?: number
          unit_amount?: number
          updated_at?: string
          workplace_id: string
        }
        Update: {
          billing_interval?: string
          code?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          hsn_sac?: string | null
          id?: string
          interval_count?: number
          metadata?: Json
          name?: string
          product_id?: string | null
          setup_fee?: number
          status?: string
          tax_rate?: number
          trial_days?: number
          unit_amount?: number
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_plans_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_plans_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      support_services: {
        Row: {
          active: boolean | null
          category: string
          cover_gif_path: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          description: string | null
          documents_required: string[] | null
          embedding: string | null
          gov_avg_time: string | null
          government_fee: number | null
          government_fee_description: string | null
          id: string
          legal_act: string | null
          metadata: Json | null
          order: number | null
          price: string
          required_modules: string[] | null
          service_id: string
          service_name: string
          square_image_path: string | null
          subcategory: string | null
          timeline: string
          updated_at: string | null
          who_it_is_for: string | null
          why_it_is_needed: string | null
        }
        Insert: {
          active?: boolean | null
          category: string
          cover_gif_path?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          documents_required?: string[] | null
          embedding?: string | null
          gov_avg_time?: string | null
          government_fee?: number | null
          government_fee_description?: string | null
          id?: string
          legal_act?: string | null
          metadata?: Json | null
          order?: number | null
          price: string
          required_modules?: string[] | null
          service_id: string
          service_name: string
          square_image_path?: string | null
          subcategory?: string | null
          timeline: string
          updated_at?: string | null
          who_it_is_for?: string | null
          why_it_is_needed?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string
          cover_gif_path?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          documents_required?: string[] | null
          embedding?: string | null
          gov_avg_time?: string | null
          government_fee?: number | null
          government_fee_description?: string | null
          id?: string
          legal_act?: string | null
          metadata?: Json | null
          order?: number | null
          price?: string
          required_modules?: string[] | null
          service_id?: string
          service_name?: string
          square_image_path?: string | null
          subcategory?: string | null
          timeline?: string
          updated_at?: string | null
          who_it_is_for?: string | null
          why_it_is_needed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_services_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_assignments: {
        Row: {
          assigned_by: string
          assigned_from: string | null
          assigned_to: string | null
          assignment_type: string
          created_at: string | null
          id: string
          reason: string | null
          ticket_id: string
        }
        Insert: {
          assigned_by: string
          assigned_from?: string | null
          assigned_to?: string | null
          assignment_type: string
          created_at?: string | null
          id?: string
          reason?: string | null
          ticket_id: string
        }
        Update: {
          assigned_by?: string
          assigned_from?: string | null
          assigned_to?: string | null
          assignment_type?: string
          created_at?: string | null
          id?: string
          reason?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_assignments_assigned_from_fkey"
            columns: ["assigned_from"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_assignments_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_assignments_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_chats: {
        Row: {
          created_at: string | null
          id: string
          message: string
          profile_id: string | null
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          profile_id?: string | null
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          profile_id?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_chats_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_chats_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_document_departments: {
        Row: {
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          document_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          department: Database["public"]["Enums"]["department"]
          document_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          department?: Database["public"]["Enums"]["department"]
          document_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_document_departments_document_id_fkey"
            columns: ["document_id"]
            referencedRelation: "support_ticket_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_document_members: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_document_members_document_id_fkey"
            columns: ["document_id"]
            referencedRelation: "support_ticket_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_document_members_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_documents: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          size: number | null
          ticket_id: string | null
          updated_at: string | null
          url: string | null
          visibility_type: Database["public"]["Enums"]["visibility_type"] | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          size?: number | null
          ticket_id?: string | null
          updated_at?: string | null
          url?: string | null
          visibility_type?:
            | Database["public"]["Enums"]["visibility_type"]
            | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          size?: number | null
          ticket_id?: string | null
          updated_at?: string | null
          url?: string | null
          visibility_type?:
            | Database["public"]["Enums"]["visibility_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_documents_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_documents_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          acceptance_criteria: Json | null
          agent_group_id: string | null
          amount_due: number | null
          amount_paid: number | null
          amplify_project_id: string | null
          assigned_to: string | null
          assignee_type: string | null
          contract_id: string | null
          created_at: string | null
          created_by: string | null
          creator_type: string | null
          description: string | null
          due_date: string | null
          funding_service_id: string | null
          id: string
          invoice_id: string | null
          invoiced: boolean | null
          invoiced_at: string | null
          metadata: Json | null
          origin_id: string | null
          origin_type: string | null
          package_id: string | null
          parent_ticket_id: string | null
          payment_due_date: string | null
          payment_method: string | null
          payment_status: string | null
          priority: Database["public"]["Enums"]["support_ticket_priority"]
          service_id: string | null
          stage_key: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["support_ticket_status"]
          system_key: string | null
          title: string
          updated_at: string | null
          workplace_id: string | null
        }
        Insert: {
          acceptance_criteria?: Json | null
          agent_group_id?: string | null
          amount_due?: number | null
          amount_paid?: number | null
          amplify_project_id?: string | null
          assigned_to?: string | null
          assignee_type?: string | null
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          creator_type?: string | null
          description?: string | null
          due_date?: string | null
          funding_service_id?: string | null
          id?: string
          invoice_id?: string | null
          invoiced?: boolean | null
          invoiced_at?: string | null
          metadata?: Json | null
          origin_id?: string | null
          origin_type?: string | null
          package_id?: string | null
          parent_ticket_id?: string | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          priority?: Database["public"]["Enums"]["support_ticket_priority"]
          service_id?: string | null
          stage_key?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["support_ticket_status"]
          system_key?: string | null
          title: string
          updated_at?: string | null
          workplace_id?: string | null
        }
        Update: {
          acceptance_criteria?: Json | null
          agent_group_id?: string | null
          amount_due?: number | null
          amount_paid?: number | null
          amplify_project_id?: string | null
          assigned_to?: string | null
          assignee_type?: string | null
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          creator_type?: string | null
          description?: string | null
          due_date?: string | null
          funding_service_id?: string | null
          id?: string
          invoice_id?: string | null
          invoiced?: boolean | null
          invoiced_at?: string | null
          metadata?: Json | null
          origin_id?: string | null
          origin_type?: string | null
          package_id?: string | null
          parent_ticket_id?: string | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          priority?: Database["public"]["Enums"]["support_ticket_priority"]
          service_id?: string | null
          stage_key?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["support_ticket_status"]
          system_key?: string | null
          title?: string
          updated_at?: string | null
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_agent_group_id_fkey"
            columns: ["agent_group_id"]
            referencedRelation: "agent_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_amplify_project_id_fkey"
            columns: ["amplify_project_id"]
            referencedRelation: "amplify_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_funding_service_id_fkey"
            columns: ["funding_service_id"]
            referencedRelation: "funding_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "jri_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_parent_ticket_id_fkey"
            columns: ["parent_ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_service_id_fkey"
            columns: ["service_id"]
            referencedRelation: "support_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_challans: {
        Row: {
          assessment_year: string | null
          bank_account_id: string | null
          bank_name: string | null
          branch_name: string | null
          bsr_code: string | null
          challan_no: string
          challan_serial_no: string | null
          challan_type: string
          created_at: string | null
          created_by: string | null
          deposit_date: string
          education_cess_amount: number | null
          financial_year: string
          id: string
          interest_amount: number | null
          metadata: Json | null
          penalty_amount: number | null
          quarter: string
          receipt_url: string | null
          remarks: string | null
          status: string | null
          surcharge_amount: number | null
          tax_amount: number
          tcs_entry_ids: string[] | null
          tds_entry_ids: string[] | null
          total_amount: number
          updated_at: string | null
          verification_date: string | null
          workplace_id: string
        }
        Insert: {
          assessment_year?: string | null
          bank_account_id?: string | null
          bank_name?: string | null
          branch_name?: string | null
          bsr_code?: string | null
          challan_no: string
          challan_serial_no?: string | null
          challan_type: string
          created_at?: string | null
          created_by?: string | null
          deposit_date: string
          education_cess_amount?: number | null
          financial_year: string
          id?: string
          interest_amount?: number | null
          metadata?: Json | null
          penalty_amount?: number | null
          quarter: string
          receipt_url?: string | null
          remarks?: string | null
          status?: string | null
          surcharge_amount?: number | null
          tax_amount?: number
          tcs_entry_ids?: string[] | null
          tds_entry_ids?: string[] | null
          total_amount?: number
          updated_at?: string | null
          verification_date?: string | null
          workplace_id: string
        }
        Update: {
          assessment_year?: string | null
          bank_account_id?: string | null
          bank_name?: string | null
          branch_name?: string | null
          bsr_code?: string | null
          challan_no?: string
          challan_serial_no?: string | null
          challan_type?: string
          created_at?: string | null
          created_by?: string | null
          deposit_date?: string
          education_cess_amount?: number | null
          financial_year?: string
          id?: string
          interest_amount?: number | null
          metadata?: Json | null
          penalty_amount?: number | null
          quarter?: string
          receipt_url?: string | null
          remarks?: string | null
          status?: string | null
          surcharge_amount?: number | null
          tax_amount?: number
          tcs_entry_ids?: string[] | null
          tds_entry_ids?: string[] | null
          total_amount?: number
          updated_at?: string | null
          verification_date?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tax_challans_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_challans_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_challans_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tcs_challans: {
        Row: {
          acknowledgment_no: string | null
          bsr_code: string
          challan_no: string
          challan_serial_no: string | null
          created_at: string | null
          created_by: string | null
          deposit_bank: string | null
          deposit_branch: string | null
          deposit_date: string
          financial_year: string
          id: string
          interest_amount: number | null
          late_fee_amount: number | null
          quarter: string
          remarks: string | null
          section_details: Json | null
          status: string | null
          tcs_amount: number
          total_amount: number
          updated_at: string | null
          verified: boolean | null
          verified_date: string | null
          workplace_id: string
        }
        Insert: {
          acknowledgment_no?: string | null
          bsr_code: string
          challan_no: string
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deposit_bank?: string | null
          deposit_branch?: string | null
          deposit_date: string
          financial_year: string
          id?: string
          interest_amount?: number | null
          late_fee_amount?: number | null
          quarter: string
          remarks?: string | null
          section_details?: Json | null
          status?: string | null
          tcs_amount?: number
          total_amount?: number
          updated_at?: string | null
          verified?: boolean | null
          verified_date?: string | null
          workplace_id: string
        }
        Update: {
          acknowledgment_no?: string | null
          bsr_code?: string
          challan_no?: string
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deposit_bank?: string | null
          deposit_branch?: string | null
          deposit_date?: string
          financial_year?: string
          id?: string
          interest_amount?: number | null
          late_fee_amount?: number | null
          quarter?: string
          remarks?: string | null
          section_details?: Json | null
          status?: string | null
          tcs_amount?: number
          total_amount?: number
          updated_at?: string | null
          verified?: boolean | null
          verified_date?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tcs_challans_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tcs_entries: {
        Row: {
          bsr_code: string | null
          challan_id: string | null
          challan_no: string | null
          collectee_id: string | null
          collectee_name: string | null
          collectee_pan: string | null
          collection_date: string
          created_at: string | null
          created_by: string | null
          deposit_date: string | null
          deposited: boolean | null
          financial_year: string
          id: string
          invoice_id: string | null
          pan_verified: boolean | null
          quarter: string
          remarks: string | null
          sale_amount: number
          status: string | null
          tax_challan_id: string | null
          tcs_amount: number
          tcs_rate: number
          tcs_rate_id: string | null
          tcs_section: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          bsr_code?: string | null
          challan_id?: string | null
          challan_no?: string | null
          collectee_id?: string | null
          collectee_name?: string | null
          collectee_pan?: string | null
          collection_date: string
          created_at?: string | null
          created_by?: string | null
          deposit_date?: string | null
          deposited?: boolean | null
          financial_year: string
          id?: string
          invoice_id?: string | null
          pan_verified?: boolean | null
          quarter: string
          remarks?: string | null
          sale_amount?: number
          status?: string | null
          tax_challan_id?: string | null
          tcs_amount?: number
          tcs_rate?: number
          tcs_rate_id?: string | null
          tcs_section: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          bsr_code?: string | null
          challan_id?: string | null
          challan_no?: string | null
          collectee_id?: string | null
          collectee_name?: string | null
          collectee_pan?: string | null
          collection_date?: string
          created_at?: string | null
          created_by?: string | null
          deposit_date?: string | null
          deposited?: boolean | null
          financial_year?: string
          id?: string
          invoice_id?: string | null
          pan_verified?: boolean | null
          quarter?: string
          remarks?: string | null
          sale_amount?: number
          status?: string | null
          tax_challan_id?: string | null
          tcs_amount?: number
          tcs_rate?: number
          tcs_rate_id?: string | null
          tcs_section?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tcs_entries_challan_id_fkey"
            columns: ["challan_id"]
            referencedRelation: "tcs_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_collectee_id_fkey"
            columns: ["collectee_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_tax_challan_id_fkey"
            columns: ["tax_challan_id"]
            referencedRelation: "tax_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_tcs_rate_id_fkey"
            columns: ["tcs_rate_id"]
            referencedRelation: "tcs_rates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcs_entries_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tcs_rates: {
        Row: {
          created_at: string | null
          description: string
          effective_from: string
          effective_to: string | null
          id: string
          is_active: boolean | null
          nature_of_goods: string
          no_pan_rate: number
          rate: number
          section: string
          threshold_limit: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          is_active?: boolean | null
          nature_of_goods: string
          no_pan_rate?: number
          rate?: number
          section: string
          threshold_limit?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          is_active?: boolean | null
          nature_of_goods?: string
          no_pan_rate?: number
          rate?: number
          section?: string
          threshold_limit?: number | null
        }
        Relationships: []
      }
      tds_challans: {
        Row: {
          acknowledgment_no: string | null
          bsr_code: string
          challan_no: string
          challan_serial_no: string | null
          created_at: string | null
          created_by: string | null
          deposit_bank: string | null
          deposit_branch: string | null
          deposit_date: string
          financial_year: string
          id: string
          interest_amount: number | null
          late_fee_amount: number | null
          quarter: string
          remarks: string | null
          section_details: Json | null
          status: string | null
          tds_amount: number
          total_amount: number
          updated_at: string | null
          verified: boolean | null
          verified_date: string | null
          workplace_id: string
        }
        Insert: {
          acknowledgment_no?: string | null
          bsr_code: string
          challan_no: string
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deposit_bank?: string | null
          deposit_branch?: string | null
          deposit_date: string
          financial_year: string
          id?: string
          interest_amount?: number | null
          late_fee_amount?: number | null
          quarter: string
          remarks?: string | null
          section_details?: Json | null
          status?: string | null
          tds_amount?: number
          total_amount?: number
          updated_at?: string | null
          verified?: boolean | null
          verified_date?: string | null
          workplace_id: string
        }
        Update: {
          acknowledgment_no?: string | null
          bsr_code?: string
          challan_no?: string
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deposit_bank?: string | null
          deposit_branch?: string | null
          deposit_date?: string
          financial_year?: string
          id?: string
          interest_amount?: number | null
          late_fee_amount?: number | null
          quarter?: string
          remarks?: string | null
          section_details?: Json | null
          status?: string | null
          tds_amount?: number
          total_amount?: number
          updated_at?: string | null
          verified?: boolean | null
          verified_date?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tds_challans_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tds_entries: {
        Row: {
          bsr_code: string | null
          challan_id: string | null
          challan_no: string | null
          challan_serial_no: string | null
          created_at: string | null
          created_by: string | null
          deductee_id: string | null
          deductee_name: string | null
          deductee_pan: string | null
          deductee_type: string | null
          deposit_date: string | null
          deposited: boolean | null
          education_cess_amount: number | null
          expense_id: string | null
          financial_year: string
          gross_amount: number
          id: string
          net_amount: number
          pan_verified: boolean | null
          payment_date: string
          payment_type: string | null
          quarter: string
          remarks: string | null
          status: string | null
          surcharge_amount: number | null
          tax_challan_id: string | null
          tds_amount: number
          tds_rate: number
          tds_rate_id: string | null
          tds_section: string
          total_tds_amount: number
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          bsr_code?: string | null
          challan_id?: string | null
          challan_no?: string | null
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deductee_id?: string | null
          deductee_name?: string | null
          deductee_pan?: string | null
          deductee_type?: string | null
          deposit_date?: string | null
          deposited?: boolean | null
          education_cess_amount?: number | null
          expense_id?: string | null
          financial_year: string
          gross_amount?: number
          id?: string
          net_amount?: number
          pan_verified?: boolean | null
          payment_date: string
          payment_type?: string | null
          quarter: string
          remarks?: string | null
          status?: string | null
          surcharge_amount?: number | null
          tax_challan_id?: string | null
          tds_amount?: number
          tds_rate?: number
          tds_rate_id?: string | null
          tds_section: string
          total_tds_amount?: number
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          bsr_code?: string | null
          challan_id?: string | null
          challan_no?: string | null
          challan_serial_no?: string | null
          created_at?: string | null
          created_by?: string | null
          deductee_id?: string | null
          deductee_name?: string | null
          deductee_pan?: string | null
          deductee_type?: string | null
          deposit_date?: string | null
          deposited?: boolean | null
          education_cess_amount?: number | null
          expense_id?: string | null
          financial_year?: string
          gross_amount?: number
          id?: string
          net_amount?: number
          pan_verified?: boolean | null
          payment_date?: string
          payment_type?: string | null
          quarter?: string
          remarks?: string | null
          status?: string | null
          surcharge_amount?: number | null
          tax_challan_id?: string | null
          tds_amount?: number
          tds_rate?: number
          tds_rate_id?: string | null
          tds_section?: string
          total_tds_amount?: number
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tds_entries_challan_id_fkey"
            columns: ["challan_id"]
            referencedRelation: "tds_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_deductee_id_fkey"
            columns: ["deductee_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_expense_id_fkey"
            columns: ["expense_id"]
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_tax_challan_id_fkey"
            columns: ["tax_challan_id"]
            referencedRelation: "tax_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_tds_rate_id_fkey"
            columns: ["tds_rate_id"]
            referencedRelation: "tds_rates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tds_entries_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tds_rates: {
        Row: {
          company_rate: number
          created_at: string | null
          description: string
          education_cess_rate: number | null
          effective_from: string
          effective_to: string | null
          id: string
          individual_huf_rate: number
          is_active: boolean | null
          metadata: Json | null
          nature_of_payment: string
          no_pan_rate: number
          section: string
          surcharge_applicable: boolean | null
          threshold_limit: number | null
          updated_at: string | null
        }
        Insert: {
          company_rate?: number
          created_at?: string | null
          description: string
          education_cess_rate?: number | null
          effective_from?: string
          effective_to?: string | null
          id?: string
          individual_huf_rate?: number
          is_active?: boolean | null
          metadata?: Json | null
          nature_of_payment: string
          no_pan_rate?: number
          section: string
          surcharge_applicable?: boolean | null
          threshold_limit?: number | null
          updated_at?: string | null
        }
        Update: {
          company_rate?: number
          created_at?: string | null
          description?: string
          education_cess_rate?: number | null
          effective_from?: string
          effective_to?: string | null
          id?: string
          individual_huf_rate?: number
          is_active?: boolean | null
          metadata?: Json | null
          nature_of_payment?: string
          no_pan_rate?: number
          section?: string
          surcharge_applicable?: boolean | null
          threshold_limit?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          fields: Json | null
          id: string
          is_default: boolean | null
          layout: Json
          name: string
          styles: Json | null
          type: string
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          fields?: Json | null
          id?: string
          is_default?: boolean | null
          layout: Json
          name: string
          styles?: Json | null
          type: string
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          fields?: Json | null
          id?: string
          is_default?: boolean | null
          layout?: Json
          name?: string
          styles?: Json | null
          type?: string
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_chat_reactions: {
        Row: {
          actor_id: string
          actor_type: string
          chat_id: string
          created_at: string | null
          emoji: string
          id: string
          workplace_id: string
        }
        Insert: {
          actor_id: string
          actor_type: string
          chat_id: string
          created_at?: string | null
          emoji: string
          id?: string
          workplace_id: string
        }
        Update: {
          actor_id?: string
          actor_type?: string
          chat_id?: string
          created_at?: string | null
          emoji?: string
          id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_chat_reactions_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "support_ticket_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_dependencies: {
        Row: {
          created_at: string | null
          depends_on_ticket_id: string
          id: string
          ticket_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          depends_on_ticket_id: string
          id?: string
          ticket_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          depends_on_ticket_id?: string
          id?: string
          ticket_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_dependencies_depends_on_ticket_id_fkey"
            columns: ["depends_on_ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_dependencies_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_reactions: {
        Row: {
          actor_id: string
          actor_type: string
          created_at: string | null
          emoji: string
          id: string
          ticket_id: string
          workplace_id: string
        }
        Insert: {
          actor_id: string
          actor_type: string
          created_at?: string | null
          emoji: string
          id?: string
          ticket_id: string
          workplace_id: string
        }
        Update: {
          actor_id?: string
          actor_type?: string
          created_at?: string | null
          emoji?: string
          id?: string
          ticket_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_reactions_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_sla: {
        Row: {
          breach_reason: string | null
          created_at: string | null
          escalated_at: string | null
          escalated_to: string | null
          escalation_due: string | null
          first_response_at: string | null
          first_response_due: string | null
          id: string
          priority: string
          resolution_at: string | null
          resolution_due: string | null
          resolution_sla_met: boolean | null
          response_sla_met: boolean | null
          sla_config_id: string | null
          sla_status: string | null
          ticket_id: string
          updated_at: string | null
        }
        Insert: {
          breach_reason?: string | null
          created_at?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_due?: string | null
          first_response_at?: string | null
          first_response_due?: string | null
          id?: string
          priority: string
          resolution_at?: string | null
          resolution_due?: string | null
          resolution_sla_met?: boolean | null
          response_sla_met?: boolean | null
          sla_config_id?: string | null
          sla_status?: string | null
          ticket_id: string
          updated_at?: string | null
        }
        Update: {
          breach_reason?: string | null
          created_at?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_due?: string | null
          first_response_at?: string | null
          first_response_due?: string | null
          id?: string
          priority?: string
          resolution_at?: string | null
          resolution_due?: string | null
          resolution_sla_met?: boolean | null
          response_sla_met?: boolean | null
          sla_config_id?: string | null
          sla_status?: string | null
          ticket_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_sla_escalated_to_fkey"
            columns: ["escalated_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_sla_sla_config_id_fkey"
            columns: ["sla_config_id"]
            referencedRelation: "sla_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_sla_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_subscribers: {
        Row: {
          created_at: string | null
          reason: string
          ticket_id: string
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string | null
          reason?: string
          ticket_id: string
          user_id: string
          user_type: string
        }
        Update: {
          created_at?: string | null
          reason?: string
          ticket_id?: string
          user_id?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_subscribers_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quick_access: {
        Row: {
          created_at: string
          id: string
          item_key: string
          position: number
          profile_id: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_key: string
          position?: number
          profile_id: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_key?: string
          position?: number
          profile_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quick_access_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quick_access_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_bill_items: {
        Row: {
          bill_id: string
          cgst_amount: number | null
          cgst_rate: number | null
          created_at: string | null
          description: string
          discount_amount: number | null
          discount_percentage: number | null
          grn_item_id: string | null
          grn_quantity: number | null
          hsn_sac: string | null
          id: string
          igst_amount: number | null
          igst_rate: number | null
          line_total: number | null
          po_item_id: string | null
          po_quantity: number | null
          product_id: string | null
          quantity: number | null
          quantity_variance: number | null
          sgst_amount: number | null
          sgst_rate: number | null
          tax_rate: number | null
          unit: string | null
          unit_price: number | null
        }
        Insert: {
          bill_id: string
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description: string
          discount_amount?: number | null
          discount_percentage?: number | null
          grn_item_id?: string | null
          grn_quantity?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          line_total?: number | null
          po_item_id?: string | null
          po_quantity?: number | null
          product_id?: string | null
          quantity?: number | null
          quantity_variance?: number | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Update: {
          bill_id?: string
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          description?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          grn_item_id?: string | null
          grn_quantity?: number | null
          hsn_sac?: string | null
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          line_total?: number | null
          po_item_id?: string | null
          po_quantity?: number | null
          product_id?: string | null
          quantity?: number | null
          quantity_variance?: number | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          tax_rate?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_bill_items_bill_id_fkey"
            columns: ["bill_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_items_grn_item_id_fkey"
            columns: ["grn_item_id"]
            referencedRelation: "grn_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_items_po_item_id_fkey"
            columns: ["po_item_id"]
            referencedRelation: "purchase_order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_bill_payments: {
        Row: {
          amount: number
          bank_account_id: string | null
          bank_statement_line_id: string | null
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string
          reference_number: string | null
          updated_at: string
          vendor_bill_id: string
          vendor_id: string | null
          workplace_id: string
        }
        Insert: {
          amount: number
          bank_account_id?: string | null
          bank_statement_line_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          reference_number?: string | null
          updated_at?: string
          vendor_bill_id: string
          vendor_id?: string | null
          workplace_id: string
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          bank_statement_line_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          reference_number?: string | null
          updated_at?: string
          vendor_bill_id?: string
          vendor_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_bill_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_payments_bank_statement_line_id_fkey"
            columns: ["bank_statement_line_id"]
            referencedRelation: "bank_statement_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_payments_vendor_bill_id_fkey"
            columns: ["vendor_bill_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_payments_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bill_payments_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_bills: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attachment_urls: Json | null
          balance_due: number | null
          bill_date: string | null
          bill_number: string
          cgst_amount: number | null
          created_at: string | null
          created_by: string | null
          discount_amount: number | null
          document_url: string | null
          due_date: string | null
          grn_ids: string[] | null
          id: string
          igst_amount: number | null
          internal_notes: string | null
          is_reverse_charge: boolean | null
          last_payment_date: string | null
          match_notes: string | null
          match_variance_amount: number | null
          notes: string | null
          paid_amount: number | null
          place_of_supply: string | null
          po_ids: string[] | null
          sgst_amount: number | null
          shipping_charges: number | null
          status: string | null
          subtotal: number | null
          tax_total: number | null
          tds_amount: number | null
          tds_applicable: boolean | null
          tds_rate: number | null
          tds_section: string | null
          three_way_match_status: string | null
          total: number | null
          updated_at: string | null
          vendor_gstin: string | null
          vendor_id: string | null
          vendor_invoice_date: string | null
          vendor_invoice_number: string | null
          workplace_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attachment_urls?: Json | null
          balance_due?: number | null
          bill_date?: string | null
          bill_number: string
          cgst_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          document_url?: string | null
          due_date?: string | null
          grn_ids?: string[] | null
          id?: string
          igst_amount?: number | null
          internal_notes?: string | null
          is_reverse_charge?: boolean | null
          last_payment_date?: string | null
          match_notes?: string | null
          match_variance_amount?: number | null
          notes?: string | null
          paid_amount?: number | null
          place_of_supply?: string | null
          po_ids?: string[] | null
          sgst_amount?: number | null
          shipping_charges?: number | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          tds_amount?: number | null
          tds_applicable?: boolean | null
          tds_rate?: number | null
          tds_section?: string | null
          three_way_match_status?: string | null
          total?: number | null
          updated_at?: string | null
          vendor_gstin?: string | null
          vendor_id?: string | null
          vendor_invoice_date?: string | null
          vendor_invoice_number?: string | null
          workplace_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attachment_urls?: Json | null
          balance_due?: number | null
          bill_date?: string | null
          bill_number?: string
          cgst_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          document_url?: string | null
          due_date?: string | null
          grn_ids?: string[] | null
          id?: string
          igst_amount?: number | null
          internal_notes?: string | null
          is_reverse_charge?: boolean | null
          last_payment_date?: string | null
          match_notes?: string | null
          match_variance_amount?: number | null
          notes?: string | null
          paid_amount?: number | null
          place_of_supply?: string | null
          po_ids?: string[] | null
          sgst_amount?: number | null
          shipping_charges?: number | null
          status?: string | null
          subtotal?: number | null
          tax_total?: number | null
          tds_amount?: number | null
          tds_applicable?: boolean | null
          tds_rate?: number | null
          tds_section?: string | null
          three_way_match_status?: string | null
          total?: number | null
          updated_at?: string | null
          vendor_gstin?: string | null
          vendor_id?: string | null
          vendor_invoice_date?: string | null
          vendor_invoice_number?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_bills_approved_by_fkey"
            columns: ["approved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bills_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bills_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bills_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_return_financial_events: {
        Row: {
          accepted_stock_quantity_delta: number
          accounting_event_id: string | null
          created_by: string | null
          debit_note_id: string | null
          effective_at: string
          id: string
          idempotency_key: string
          input_tax_amount_delta: number
          inventory_valuation_event_id: string | null
          lifecycle_event: string
          metadata: Json
          payable_amount_delta: number
          payload_hash: string
          recorded_at: string
          source_id: string
          source_type: string
          source_version: number
          vendor_bill_id: string | null
          vendor_return_id: string
          workplace_id: string
        }
        Insert: {
          accepted_stock_quantity_delta?: number
          accounting_event_id?: string | null
          created_by?: string | null
          debit_note_id?: string | null
          effective_at: string
          id?: string
          idempotency_key: string
          input_tax_amount_delta?: number
          inventory_valuation_event_id?: string | null
          lifecycle_event: string
          metadata?: Json
          payable_amount_delta?: number
          payload_hash: string
          recorded_at?: string
          source_id: string
          source_type: string
          source_version?: number
          vendor_bill_id?: string | null
          vendor_return_id: string
          workplace_id: string
        }
        Update: {
          accepted_stock_quantity_delta?: number
          accounting_event_id?: string | null
          created_by?: string | null
          debit_note_id?: string | null
          effective_at?: string
          id?: string
          idempotency_key?: string
          input_tax_amount_delta?: number
          inventory_valuation_event_id?: string | null
          lifecycle_event?: string
          metadata?: Json
          payable_amount_delta?: number
          payload_hash?: string
          recorded_at?: string
          source_id?: string
          source_type?: string
          source_version?: number
          vendor_bill_id?: string | null
          vendor_return_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_return_events_accounting_workplace_fkey"
            columns: ["accounting_event_id", "workplace_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "vendor_return_events_bill_workplace_fkey"
            columns: ["vendor_bill_id", "workplace_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "vendor_return_events_debit_note_workplace_fkey"
            columns: ["debit_note_id", "workplace_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "vendor_return_events_inventory_workplace_fkey"
            columns: ["inventory_valuation_event_id", "workplace_id"]
            referencedRelation: "inventory_valuation_events"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "vendor_return_events_return_workplace_fkey"
            columns: ["vendor_return_id", "workplace_id"]
            referencedRelation: "vendor_returns"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "vendor_return_financial_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_return_financial_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_return_items: {
        Row: {
          created_at: string
          description: string | null
          grn_item_id: string
          id: string
          line_total: number
          product_id: string | null
          quantity: number
          reason: string | null
          return_id: string
          tax_rate: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          grn_item_id: string
          id?: string
          line_total: number
          product_id?: string | null
          quantity: number
          reason?: string | null
          return_id: string
          tax_rate?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          grn_item_id?: string
          id?: string
          line_total?: number
          product_id?: string | null
          quantity?: number
          reason?: string | null
          return_id?: string
          tax_rate?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "vendor_return_items_grn_item_id_fkey"
            columns: ["grn_item_id"]
            referencedRelation: "grn_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_return_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_return_items_return_id_fkey"
            columns: ["return_id"]
            referencedRelation: "vendor_returns"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_returns: {
        Row: {
          created_at: string
          created_by: string | null
          debit_note_id: string | null
          grn_id: string
          id: string
          notes: string | null
          reason: string | null
          return_date: string
          return_number: string
          status: string
          status_updated_at: string | null
          status_updated_by: string | null
          subtotal: number
          tax_total: number
          total: number
          updated_at: string
          vendor_bill_id: string | null
          vendor_id: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          debit_note_id?: string | null
          grn_id: string
          id?: string
          notes?: string | null
          reason?: string | null
          return_date?: string
          return_number: string
          status?: string
          status_updated_at?: string | null
          status_updated_by?: string | null
          subtotal?: number
          tax_total?: number
          total?: number
          updated_at?: string
          vendor_bill_id?: string | null
          vendor_id: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          debit_note_id?: string | null
          grn_id?: string
          id?: string
          notes?: string | null
          reason?: string | null
          return_date?: string
          return_number?: string
          status?: string
          status_updated_at?: string | null
          status_updated_by?: string | null
          subtotal?: number
          tax_total?: number
          total?: number
          updated_at?: string
          vendor_bill_id?: string | null
          vendor_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_returns_debit_note_id_fkey"
            columns: ["debit_note_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_returns_grn_id_fkey"
            columns: ["grn_id"]
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_returns_vendor_bill_id_fkey"
            columns: ["vendor_bill_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_returns_vendor_id_fkey"
            columns: ["vendor_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_returns_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      version_logs: {
        Row: {
          change_type: string
          created_at: string | null
          created_by: string | null
          id: string
          new_version: Json | null
          object_id: string
          object_type: string
          previous_version: Json | null
        }
        Insert: {
          change_type: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          new_version?: Json | null
          object_id: string
          object_type: string
          previous_version?: Json | null
        }
        Update: {
          change_type?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          new_version?: Json | null
          object_id?: string
          object_type?: string
          previous_version?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "version_logs_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      withholding_documents: {
        Row: {
          created_at: string
          created_by: string | null
          document_date: string | null
          document_path: string | null
          document_type: string
          external_reference: string
          id: string
          metadata: Json
          period_end: string | null
          period_start: string | null
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          document_date?: string | null
          document_path?: string | null
          document_type: string
          external_reference: string
          id?: string
          metadata?: Json
          period_end?: string | null
          period_start?: string | null
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          document_date?: string | null
          document_path?: string | null
          document_type?: string
          external_reference?: string
          id?: string
          metadata?: Json
          period_end?: string | null
          period_start?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withholding_documents_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withholding_documents_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      withholding_event_documents: {
        Row: {
          linked_at: string
          linked_by: string | null
          withholding_document_id: string
          withholding_event_id: string
          workplace_id: string
        }
        Insert: {
          linked_at?: string
          linked_by?: string | null
          withholding_document_id: string
          withholding_event_id: string
          workplace_id: string
        }
        Update: {
          linked_at?: string
          linked_by?: string | null
          withholding_document_id?: string
          withholding_event_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withholding_event_documents_document_workplace_fkey"
            columns: ["withholding_document_id", "workplace_id"]
            referencedRelation: "withholding_documents"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_event_documents_event_workplace_fkey"
            columns: ["withholding_event_id", "workplace_id"]
            referencedRelation: "withholding_lifecycle_events"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_event_documents_linked_by_fkey"
            columns: ["linked_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withholding_event_documents_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      withholding_lifecycle_events: {
        Row: {
          accounting_event_id: string | null
          contact_id: string | null
          created_by: string | null
          direction: string
          effective_at: string
          gross_amount: number | null
          id: string
          idempotency_key: string | null
          invoice_id: string | null
          lifecycle_event: string
          metadata: Json
          payload_hash: string
          recorded_at: string
          section_code: string | null
          source_id: string
          source_type: string
          source_version: number
          tax_amount_delta: number
          tax_kind: string
          vendor_bill_id: string | null
          workplace_id: string
        }
        Insert: {
          accounting_event_id?: string | null
          contact_id?: string | null
          created_by?: string | null
          direction: string
          effective_at: string
          gross_amount?: number | null
          id?: string
          idempotency_key?: string | null
          invoice_id?: string | null
          lifecycle_event: string
          metadata?: Json
          payload_hash: string
          recorded_at?: string
          section_code?: string | null
          source_id: string
          source_type: string
          source_version?: number
          tax_amount_delta: number
          tax_kind: string
          vendor_bill_id?: string | null
          workplace_id: string
        }
        Update: {
          accounting_event_id?: string | null
          contact_id?: string | null
          created_by?: string | null
          direction?: string
          effective_at?: string
          gross_amount?: number | null
          id?: string
          idempotency_key?: string | null
          invoice_id?: string | null
          lifecycle_event?: string
          metadata?: Json
          payload_hash?: string
          recorded_at?: string
          section_code?: string | null
          source_id?: string
          source_type?: string
          source_version?: number
          tax_amount_delta?: number
          tax_kind?: string
          vendor_bill_id?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withholding_events_accounting_workplace_fkey"
            columns: ["accounting_event_id", "workplace_id"]
            referencedRelation: "accounting_events"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_events_contact_workplace_fkey"
            columns: ["contact_id", "workplace_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_events_invoice_workplace_fkey"
            columns: ["invoice_id", "workplace_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_events_vendor_bill_workplace_fkey"
            columns: ["vendor_bill_id", "workplace_id"]
            referencedRelation: "vendor_bills"
            referencedColumns: ["id", "workplace_id"]
          },
          {
            foreignKeyName: "withholding_lifecycle_events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withholding_lifecycle_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_ai_providers: {
        Row: {
          base_url: string
          created_at: string
          created_by: string | null
          key_secret_id: string
          label: string | null
          model: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          base_url: string
          created_at?: string
          created_by?: string | null
          key_secret_id: string
          label?: string | null
          model: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          base_url?: string
          created_at?: string
          created_by?: string | null
          key_secret_id?: string
          label?: string | null
          model?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_ai_providers_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_compliance_events: {
        Row: {
          event_date: string | null
          event_key: string
          updated_at: string
          updated_by: string | null
          workplace_id: string
        }
        Insert: {
          event_date?: string | null
          event_key: string
          updated_at?: string
          updated_by?: string | null
          workplace_id: string
        }
        Update: {
          event_date?: string | null
          event_key?: string
          updated_at?: string
          updated_by?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_compliance_events_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_connections: {
        Row: {
          allowed_tools: string[]
          app_name: string | null
          app_slug: string
          connected_account_id: string | null
          connected_by: string | null
          created_at: string
          error: string | null
          id: string
          last_used_at: string | null
          provider: string
          status: string
          updated_at: string
          workplace_id: string
        }
        Insert: {
          allowed_tools?: string[]
          app_name?: string | null
          app_slug: string
          connected_account_id?: string | null
          connected_by?: string | null
          created_at?: string
          error?: string | null
          id?: string
          last_used_at?: string | null
          provider?: string
          status?: string
          updated_at?: string
          workplace_id: string
        }
        Update: {
          allowed_tools?: string[]
          app_name?: string | null
          app_slug?: string
          connected_account_id?: string | null
          connected_by?: string | null
          created_at?: string
          error?: string | null
          id?: string
          last_used_at?: string | null
          provider?: string
          status?: string
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_connections_connected_by_fkey"
            columns: ["connected_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_connections_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_consultants: {
        Row: {
          accepted_at: string | null
          consultant_profile_id: string | null
          firm_id: string | null
          firm_name: string | null
          id: string
          invite_expires_at: string | null
          invite_token_hash: string | null
          invited_at: string
          invited_by: string
          invited_email: string
          revoked_at: string | null
          share_compliance: boolean
          status: string
          workplace_id: string
        }
        Insert: {
          accepted_at?: string | null
          consultant_profile_id?: string | null
          firm_id?: string | null
          firm_name?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token_hash?: string | null
          invited_at?: string
          invited_by: string
          invited_email: string
          revoked_at?: string | null
          share_compliance?: boolean
          status?: string
          workplace_id: string
        }
        Update: {
          accepted_at?: string | null
          consultant_profile_id?: string | null
          firm_id?: string | null
          firm_name?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token_hash?: string | null
          invited_at?: string
          invited_by?: string
          invited_email?: string
          revoked_at?: string | null
          share_compliance?: boolean
          status?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_consultants_consultant_profile_id_fkey"
            columns: ["consultant_profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_consultants_firm_id_fkey"
            columns: ["firm_id"]
            referencedRelation: "consultant_firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_consultants_invited_by_fkey"
            columns: ["invited_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_consultants_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_invites: {
        Row: {
          created_at: string
          created_by: string | null
          custom_department: string | null
          department: string | null
          expires_at: string
          id: string
          invited_email: string
          invited_name: string | null
          module_permissions: Json | null
          role: string
          status: string
          token: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          custom_department?: string | null
          department?: string | null
          expires_at: string
          id?: string
          invited_email: string
          invited_name?: string | null
          module_permissions?: Json | null
          role?: string
          status?: string
          token: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          custom_department?: string | null
          department?: string | null
          expires_at?: string
          id?: string
          invited_email?: string
          invited_name?: string | null
          module_permissions?: Json | null
          role?: string
          status?: string
          token?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_invites_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_invites_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_mcp_tokens: {
        Row: {
          created_at: string
          created_by: string
          id: string
          last_used_at: string | null
          name: string
          revoked_at: string | null
          scopes: string[]
          token_hash: string
          token_prefix: string
          workplace_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          last_used_at?: string | null
          name: string
          revoked_at?: string | null
          scopes?: string[]
          token_hash: string
          token_prefix: string
          workplace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          last_used_at?: string | null
          name?: string
          revoked_at?: string | null
          scopes?: string[]
          token_hash?: string
          token_prefix?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_mcp_tokens_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_mcp_tokens_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_member_permissions: {
        Row: {
          can_edit: boolean | null
          can_view: boolean | null
          created_at: string | null
          granted_by: string | null
          id: string
          member_id: string | null
          module: string
          workplace_id: string | null
        }
        Insert: {
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          granted_by?: string | null
          id?: string
          member_id?: string | null
          module: string
          workplace_id?: string | null
        }
        Update: {
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          granted_by?: string | null
          id?: string
          member_id?: string | null
          module?: string
          workplace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workplace_member_permissions_granted_by_fkey"
            columns: ["granted_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_member_permissions_member_id_fkey"
            columns: ["member_id"]
            referencedRelation: "workplace_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_member_permissions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_members: {
        Row: {
          access_mode: string | null
          can_purchase: boolean
          created_at: string | null
          custom_department: string | null
          department: Database["public"]["Enums"]["department"] | null
          id: string
          profile_id: string
          role: string | null
          status: string | null
          workplace_id: string
        }
        Insert: {
          access_mode?: string | null
          can_purchase?: boolean
          created_at?: string | null
          custom_department?: string | null
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          profile_id: string
          role?: string | null
          status?: string | null
          workplace_id: string
        }
        Update: {
          access_mode?: string | null
          can_purchase?: boolean
          created_at?: string | null
          custom_department?: string | null
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          profile_id?: string
          role?: string | null
          status?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_members_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_members_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_plan_seats: {
        Row: {
          assigned_at: string
          id: string
          profile_id: string
          workplace_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          profile_id: string
          workplace_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          profile_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_plan_seats_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_plan_seats_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_return_settings: {
        Row: {
          allow_exchanges: boolean | null
          allow_returns: boolean | null
          auto_approve_under_amount: number | null
          auto_approve_unopened_items: boolean | null
          created_at: string | null
          default_exchange_window_days: number | null
          default_return_window_days: number | null
          default_store_credit_expiry_days: number | null
          id: string
          refund_methods_enabled: Json | null
          return_reasons: Json | null
          store_credit_never_expire: boolean | null
          updated_at: string | null
          workplace_id: string
        }
        Insert: {
          allow_exchanges?: boolean | null
          allow_returns?: boolean | null
          auto_approve_under_amount?: number | null
          auto_approve_unopened_items?: boolean | null
          created_at?: string | null
          default_exchange_window_days?: number | null
          default_return_window_days?: number | null
          default_store_credit_expiry_days?: number | null
          id?: string
          refund_methods_enabled?: Json | null
          return_reasons?: Json | null
          store_credit_never_expire?: boolean | null
          updated_at?: string | null
          workplace_id: string
        }
        Update: {
          allow_exchanges?: boolean | null
          allow_returns?: boolean | null
          auto_approve_under_amount?: number | null
          auto_approve_unopened_items?: boolean | null
          created_at?: string | null
          default_exchange_window_days?: number | null
          default_return_window_days?: number | null
          default_store_credit_expiry_days?: number | null
          id?: string
          refund_methods_enabled?: Json | null
          return_reasons?: Json | null
          store_credit_never_expire?: boolean | null
          updated_at?: string | null
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_return_settings_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_storage_objects: {
        Row: {
          bucket: string
          bytes: number
          created_at: string
          created_by: string | null
          id: string
          module: string | null
          path: string
          workplace_id: string
        }
        Insert: {
          bucket: string
          bytes?: number
          created_at?: string
          created_by?: string | null
          id?: string
          module?: string | null
          path: string
          workplace_id: string
        }
        Update: {
          bucket?: string
          bytes?: number
          created_at?: string
          created_by?: string | null
          id?: string
          module?: string | null
          path?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_storage_objects_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_storage_usage_rollups: {
        Row: {
          bytes_total: number
          object_count: number
          updated_at: string
          workplace_id: string
        }
        Insert: {
          bytes_total?: number
          object_count?: number
          updated_at?: string
          workplace_id: string
        }
        Update: {
          bytes_total?: number
          object_count?: number
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_storage_usage_rollups_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplace_subscriptions: {
        Row: {
          auto_renew: boolean
          billing_period: string
          created_at: string
          id: string
          is_mandate: boolean
          period_end: string | null
          period_start: string
          plan_id: string
          razorpay_customer_id: string | null
          razorpay_subscription_id: string | null
          renewal_invoice_id: string | null
          renewal_link_for: string | null
          renewal_link_id: string | null
          renewal_link_url: string | null
          status: string
          trial_started_at: string | null
          updated_at: string
          workplace_id: string
        }
        Insert: {
          auto_renew?: boolean
          billing_period?: string
          created_at?: string
          id?: string
          is_mandate?: boolean
          period_end?: string | null
          period_start?: string
          plan_id: string
          razorpay_customer_id?: string | null
          razorpay_subscription_id?: string | null
          renewal_invoice_id?: string | null
          renewal_link_for?: string | null
          renewal_link_id?: string | null
          renewal_link_url?: string | null
          status?: string
          trial_started_at?: string | null
          updated_at?: string
          workplace_id: string
        }
        Update: {
          auto_renew?: boolean
          billing_period?: string
          created_at?: string
          id?: string
          is_mandate?: boolean
          period_end?: string | null
          period_start?: string
          plan_id?: string
          razorpay_customer_id?: string | null
          razorpay_subscription_id?: string | null
          renewal_invoice_id?: string | null
          renewal_link_for?: string | null
          renewal_link_id?: string | null
          renewal_link_url?: string | null
          status?: string
          trial_started_at?: string | null
          updated_at?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "platform_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplace_subscriptions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workplaces: {
        Row: {
          amplify_builder_rules: string | null
          authorized_signatories: string[] | null
          billing_address: string | null
          billing_contact_name: string | null
          billing_phone_email: string | null
          business_address: string | null
          business_city: string | null
          business_email: string | null
          business_model: string | null
          business_name: string | null
          business_phone: string | null
          business_pincode: string | null
          business_stage: string | null
          business_state: string | null
          business_state_code: string | null
          cin: string | null
          closed_at: string | null
          closed_by: string | null
          closed_reason: string | null
          compliance_flags: Json | null
          compliance_profile_completed_at: string | null
          compliance_profile_version: number
          created_at: string | null
          created_by: string | null
          default_assignee: string | null
          delivery_instructions: string | null
          description: string | null
          e_invoicing_eligible: boolean | null
          employee_count_range:
            | Database["public"]["Enums"]["employee_range"]
            | null
          entity_type: string | null
          entity_type_id: string | null
          financial_year_start: number | null
          gstin: string | null
          has_digital_signature: boolean | null
          headcount_actual: number | null
          id: string
          incorporation_date: string | null
          industry: string | null
          industry_id: string | null
          invoice_footer_notes: string | null
          invoice_prefix: string | null
          invoice_sequence: number | null
          is_active: boolean | null
          name: string
          nature_of_work: string | null
          notes_comments: string | null
          paid_up_capital: number | null
          pan_number: string | null
          shipping_address: string | null
          shipping_contact_person: string | null
          specific_activity: string | null
          status: string | null
          sub_industry: string | null
          sub_industry_id: string | null
          tan_number: string | null
          terms_and_conditions: string | null
          turnover_bracket:
            | Database["public"]["Enums"]["turnover_bracket"]
            | null
        }
        Insert: {
          amplify_builder_rules?: string | null
          authorized_signatories?: string[] | null
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_phone_email?: string | null
          business_address?: string | null
          business_city?: string | null
          business_email?: string | null
          business_model?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_pincode?: string | null
          business_stage?: string | null
          business_state?: string | null
          business_state_code?: string | null
          cin?: string | null
          closed_at?: string | null
          closed_by?: string | null
          closed_reason?: string | null
          compliance_flags?: Json | null
          compliance_profile_completed_at?: string | null
          compliance_profile_version?: number
          created_at?: string | null
          created_by?: string | null
          default_assignee?: string | null
          delivery_instructions?: string | null
          description?: string | null
          e_invoicing_eligible?: boolean | null
          employee_count_range?:
            | Database["public"]["Enums"]["employee_range"]
            | null
          entity_type?: string | null
          entity_type_id?: string | null
          financial_year_start?: number | null
          gstin?: string | null
          has_digital_signature?: boolean | null
          headcount_actual?: number | null
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          industry_id?: string | null
          invoice_footer_notes?: string | null
          invoice_prefix?: string | null
          invoice_sequence?: number | null
          is_active?: boolean | null
          name: string
          nature_of_work?: string | null
          notes_comments?: string | null
          paid_up_capital?: number | null
          pan_number?: string | null
          shipping_address?: string | null
          shipping_contact_person?: string | null
          specific_activity?: string | null
          status?: string | null
          sub_industry?: string | null
          sub_industry_id?: string | null
          tan_number?: string | null
          terms_and_conditions?: string | null
          turnover_bracket?:
            | Database["public"]["Enums"]["turnover_bracket"]
            | null
        }
        Update: {
          amplify_builder_rules?: string | null
          authorized_signatories?: string[] | null
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_phone_email?: string | null
          business_address?: string | null
          business_city?: string | null
          business_email?: string | null
          business_model?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_pincode?: string | null
          business_stage?: string | null
          business_state?: string | null
          business_state_code?: string | null
          cin?: string | null
          closed_at?: string | null
          closed_by?: string | null
          closed_reason?: string | null
          compliance_flags?: Json | null
          compliance_profile_completed_at?: string | null
          compliance_profile_version?: number
          created_at?: string | null
          created_by?: string | null
          default_assignee?: string | null
          delivery_instructions?: string | null
          description?: string | null
          e_invoicing_eligible?: boolean | null
          employee_count_range?:
            | Database["public"]["Enums"]["employee_range"]
            | null
          entity_type?: string | null
          entity_type_id?: string | null
          financial_year_start?: number | null
          gstin?: string | null
          has_digital_signature?: boolean | null
          headcount_actual?: number | null
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          industry_id?: string | null
          invoice_footer_notes?: string | null
          invoice_prefix?: string | null
          invoice_sequence?: number | null
          is_active?: boolean | null
          name?: string
          nature_of_work?: string | null
          notes_comments?: string | null
          paid_up_capital?: number | null
          pan_number?: string | null
          shipping_address?: string | null
          shipping_contact_person?: string | null
          specific_activity?: string | null
          status?: string | null
          sub_industry?: string | null
          sub_industry_id?: string | null
          tan_number?: string | null
          terms_and_conditions?: string | null
          turnover_bracket?:
            | Database["public"]["Enums"]["turnover_bracket"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "workplaces_closed_by_fkey"
            columns: ["closed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplaces_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplaces_default_assignee_fkey"
            columns: ["default_assignee"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplaces_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplaces_industry_id_fkey"
            columns: ["industry_id"]
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workplaces_sub_industry_id_fkey"
            columns: ["sub_industry_id"]
            referencedRelation: "sub_industries"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_file_versions: {
        Row: {
          change_reason: string
          content: string | null
          created_at: string | null
          created_by_id: string | null
          created_by_type: string
          department: string
          file_name: string
          file_type: string
          id: string
          storage_path: string | null
          version: number
          workplace_id: string
          workspace_file_id: string
        }
        Insert: {
          change_reason?: string
          content?: string | null
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          department?: string
          file_name: string
          file_type?: string
          id?: string
          storage_path?: string | null
          version: number
          workplace_id: string
          workspace_file_id: string
        }
        Update: {
          change_reason?: string
          content?: string | null
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          department?: string
          file_name?: string
          file_type?: string
          id?: string
          storage_path?: string | null
          version?: number
          workplace_id?: string
          workspace_file_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_file_versions_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_file_versions_workspace_file_id_fkey"
            columns: ["workspace_file_id"]
            referencedRelation: "workspace_files"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_files: {
        Row: {
          content: string | null
          created_at: string | null
          created_by_id: string | null
          created_by_type: string
          department: string
          file_name: string
          file_type: string
          id: string
          storage_path: string | null
          updated_at: string | null
          version: number
          workplace_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          department?: string
          file_name: string
          file_type?: string
          id?: string
          storage_path?: string | null
          updated_at?: string | null
          version?: number
          workplace_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by_id?: string | null
          created_by_type?: string
          department?: string
          file_name?: string
          file_type?: string
          id?: string
          storage_path?: string | null
          updated_at?: string | null
          version?: number
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_files_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      staff_payment_summary: {
        Row: {
          current_balance: number | null
          last_payment_date: string | null
          monthly_salary: number | null
          payment_count: number | null
          payout_type: string | null
          staff_id: string | null
          staff_name: string | null
          total_advances: number | null
          total_bonuses: number | null
          total_deductions: number | null
          total_salary_paid: number | null
          workplace_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tcs_quarterly_summary: {
        Row: {
          financial_year: string | null
          quarter: string | null
          tcs_collected: number | null
          tcs_deposited: number | null
          tcs_pending: number | null
          tcs_section: string | null
          total_sale: number | null
          transaction_count: number | null
          workplace_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tcs_entries_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tds_quarterly_summary: {
        Row: {
          education_cess: number | null
          financial_year: string | null
          quarter: string | null
          tds_deducted: number | null
          tds_deposited: number | null
          tds_pending: number | null
          tds_section: string | null
          total_payment: number | null
          total_tds_with_cess: number | null
          transaction_count: number | null
          workplace_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tds_entries_workplace_id_fkey"
            columns: ["workplace_id"]
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_consultant_invite: { Args: { p_token?: string }; Returns: Json }
      accept_workplace_invite: { Args: { p_token: string }; Returns: Json }
      activate_workplace_subscription: {
        Args: {
          p_amount_inr?: number
          p_billing_period?: string
          p_period_months?: number
          p_plan_code: string
          p_razorpay_ref?: string
          p_seats?: number
          p_workplace_id: string
        }
        Returns: undefined
      }
      add_consultant_firm_member: {
        Args: { p_email: string; p_firm_id: string }
        Returns: Json
      }
      admin_list_billing_incidents: {
        Args: { p_include_resolved?: boolean }
        Returns: {
          created_at: string
          detail: string
          id: string
          kind: string
          razorpay_ref: string
          resolved_at: string
          workplace_id: string
          workplace_name: string
        }[]
      }
      admin_resolve_billing_incident: {
        Args: { p_id: string }
        Returns: undefined
      }
      advance_vendor_return_status: {
        Args: { p_return_id: string; p_target_status: string }
        Returns: Json
      }
      amplify_cron_field_matches: {
        Args: { p_field: string; p_value: number }
        Returns: boolean
      }
      amplify_default_end_date: {
        Args: { p_end_date: string }
        Returns: string
      }
      amplify_default_start_date: {
        Args: { p_start_date: string }
        Returns: string
      }
      amplify_next_cron_run: {
        Args: {
          p_after?: string
          p_cron_expression: string
          p_timezone?: string
        }
        Returns: string
      }
      amplify_profile_brief: { Args: { p_profile_id: string }; Returns: Json }
      amplify_risk_rank: { Args: { p_risk: string }; Returns: number }
      amplify_try_uuid: { Args: { p_value: string }; Returns: string }
      apply_amplify_extended_proposed_action: {
        Args: { p_action_id: string }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      apply_approved_agent_proposed_action: {
        Args: { p_action_id: string }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      apply_crm_contact_mutation: {
        Args: { p_action_id: string }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      apply_due_config_proposal: { Args: { p_rule_id: string }; Returns: Json }
      apply_pos_loyalty_adjustments: {
        Args: {
          p_contact_id: string
          p_created_by?: string
          p_earn_points?: number
          p_redeem_points?: number
          p_redemption_discount?: number
          p_transaction_id: string
          p_transaction_number: string
          p_workplace_id: string
        }
        Returns: Json
      }
      approve_agent_proposed_action: {
        Args: { p_action_id: string }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      assign_gst_invoice_number: {
        Args: { p_invoice_id: string }
        Returns: string
      }
      assign_link_to_firm: {
        Args: { p_firm_id: string; p_link_id: string }
        Returns: undefined
      }
      associate_contract_with_signatory_workplace: {
        Args: { p_contract_id: string; p_signatory_id: string }
        Returns: undefined
      }
      backfill_accounting_source_captures: {
        Args: {
          p_after_id?: string
          p_batch_size?: number
          p_source_table: string
          p_workplace_id: string
        }
        Returns: {
          captured_count: number
          last_id: string
        }[]
      }
      calculate_next_recurring_date: {
        Args: {
          p_current_date: string
          p_day_of_month?: number
          p_day_of_week?: number
          p_frequency: string
          p_interval_count?: number
        }
        Returns: string
      }
      calculate_running_balances: {
        Args: { p_bank_account_id: string }
        Returns: undefined
      }
      calculate_tcs_206c1h: {
        Args: {
          p_as_of_date: string
          p_contact_id: string
          p_has_pan?: boolean
          p_invoice_amount: number
          p_workplace_id: string
        }
        Returns: {
          cumulative_after: number
          cumulative_before: number
          rate: number
          taxable_excess: number
          tcs_amount: number
        }[]
      }
      calculate_workplace_storage: {
        Args: { workplace_id: string }
        Returns: number
      }
      can_access_business_document: {
        Args: { p_document_id: string }
        Returns: boolean
      }
      can_access_compliance_instance: {
        Args: { p_instance_id: string }
        Returns: boolean
      }
      can_access_compliance_workplace: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      can_access_contract: { Args: { p_contract_id: string }; Returns: boolean }
      can_access_contract_analysis_result: {
        Args: { p_analysis_id: string }
        Returns: boolean
      }
      can_access_contract_analysis_section: {
        Args: { p_section_id: string }
        Returns: boolean
      }
      can_access_invoice: { Args: { p_invoice_id: string }; Returns: boolean }
      can_access_jri_invoice: {
        Args: { p_invoice_id: string }
        Returns: boolean
      }
      can_access_support_ticket: {
        Args: { p_ticket_id: string }
        Returns: boolean
      }
      can_access_support_ticket_document: {
        Args: { p_document_id: string }
        Returns: boolean
      }
      can_access_workplace: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      can_insert_workplace_member: {
        Args: {
          p_profile_id: string
          p_role: string
          p_status: string
          p_workplace_id: string
        }
        Returns: boolean
      }
      can_manage_business_document: {
        Args: { p_document_id: string }
        Returns: boolean
      }
      can_manage_compliance_instance: {
        Args: { p_instance_id: string }
        Returns: boolean
      }
      can_manage_compliance_workplace: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      can_manage_contract: { Args: { p_contract_id: string }; Returns: boolean }
      can_manage_contract_analysis_result: {
        Args: { p_analysis_id: string }
        Returns: boolean
      }
      can_manage_contract_analysis_section: {
        Args: { p_section_id: string }
        Returns: boolean
      }
      can_manage_support_ticket_document: {
        Args: { p_document_id: string }
        Returns: boolean
      }
      can_manage_workplace: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      can_purchase_offerings: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      can_view_profile: { Args: { p_profile_id: string }; Returns: boolean }
      cancel_consultant_document_request: {
        Args: { p_request_id: string }
        Returns: undefined
      }
      cancel_subscription_by_razorpay_id: {
        Args: { p_status?: string; p_sub_id: string }
        Returns: undefined
      }
      chase_overdue_consultant_documents: {
        Args: { p_dry_run?: boolean; p_limit?: number }
        Returns: Json
      }
      check_overdue_invoices: { Args: never; Returns: undefined }
      check_storage_limit: {
        Args: { new_size: number; workplace_id: string }
        Returns: boolean
      }
      check_terminal_open_session: {
        Args: { p_terminal_id: string }
        Returns: boolean
      }
      claim_agent_task: {
        Args: {
          p_agent_id?: string
          p_lease_seconds?: number
          p_runtime_id?: string
          p_task_id?: string
          p_workplace_id?: string
        }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      claim_next_agent_task: {
        Args: { p_agent_id?: string; p_workplace_id?: string }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      claim_notification_push_delivery: {
        Args: {
          p_notification_id: string
          p_stale_after?: string
          p_subscription_id: string
        }
        Returns: boolean
      }
      claim_onboarding_setup: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      close_own_account: { Args: { p_profile_id?: string }; Returns: Json }
      complete_agent_task: {
        Args: { p_result?: Json; p_task_id: string }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      complete_pos_checkout: { Args: { p_payload: Json }; Returns: Json }
      complete_pos_checkout_core: { Args: { p_payload: Json }; Returns: Json }
      complete_pos_resume_payment: { Args: { p_payload: Json }; Returns: Json }
      complete_pos_resume_payment_core: {
        Args: { p_payload: Json }
        Returns: Json
      }
      compliance_completion_stats: {
        Args: { p_days?: number; p_workplace_id: string }
        Returns: {
          completed: number
          completed_with_evidence: number
          due: number
          window_days: number
        }[]
      }
      compliance_coverage_monitor: {
        Args: { p_run: string }
        Returns: undefined
      }
      compliance_due_date_from_config: {
        Args: {
          p_config: Json
          p_period_end: string
          p_period_start: string
          p_workplace_id: string
        }
        Returns: string
      }
      compliance_due_date_v2: {
        Args: {
          p_period_end: string
          p_period_start: string
          p_rule_id: string
          p_workplace_id: string
        }
        Returns: string
      }
      compliance_eval_condition: {
        Args: { p_cond: Json; p_wp: Json }
        Returns: boolean
      }
      compliance_eval_conditions_obj: {
        Args: { p_cond: Json; p_wp: Json }
        Returns: boolean
      }
      compliance_eval_trigger_groups: {
        Args: { p_groups: Json; p_wp: Json }
        Returns: boolean
      }
      compliance_instance_dependencies_satisfied: {
        Args: { p_instance_id: string }
        Returns: boolean
      }
      compliance_match_values: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      compliance_nightly_sweep: { Args: never; Returns: Json }
      compliance_norm: { Args: { p: string }; Returns: string }
      compliance_num: { Args: { t: string }; Returns: number }
      compliance_period_label: {
        Args: {
          p_frequency: string
          p_period_end: string
          p_period_start: string
        }
        Returns: string
      }
      compliance_preview_due_dates: {
        Args: { p_config: Json; p_periodicity: string }
        Returns: Json
      }
      compliance_sweep_cron_active: { Args: never; Returns: boolean }
      compliance_trigger_groups_has_field: {
        Args: { p_field: string; p_groups: Json }
        Returns: boolean
      }
      compliance_validate_due_config: { Args: { p: Json }; Returns: boolean }
      connect_consultant_whatsapp: {
        Args: {
          p_access_token?: string
          p_bsp_name?: string
          p_bsp_reference?: string
          p_business_account_id?: string
          p_display_name?: string
          p_firm_id?: string
          p_phone_e164?: string
          p_phone_number_id?: string
          p_provider: string
        }
        Returns: string
      }
      consultant_add_client_file: {
        Args: {
          p_client_id: string
          p_mime_type?: string
          p_size_bytes?: number
          p_storage_path: string
          p_title: string
        }
        Returns: string
      }
      consultant_add_client_reminder: {
        Args: {
          p_channel?: string
          p_client_id: string
          p_due_date: string
          p_note?: string
          p_title: string
        }
        Returns: string
      }
      consultant_ai_claim: {
        Args: { p_action: string; p_daily_cap?: number }
        Returns: number
      }
      consultant_archive_client: {
        Args: { p_client_id: string }
        Returns: undefined
      }
      consultant_can_read_compliance: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      consultant_can_read_report: {
        Args: {
          p_financial_year?: string
          p_report_key: string
          p_workplace_id: string
        }
        Returns: boolean
      }
      consultant_cancel_client_reminder: {
        Args: { p_id: string }
        Returns: undefined
      }
      consultant_client_activity: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      consultant_client_detail: { Args: { p_client_id: string }; Returns: Json }
      consultant_client_reports: {
        Args: { p_workplace_id: string }
        Returns: {
          expires_at: string
          financial_year: string
          grant_id: string
          granted_at: string
          last_generated_at: string
          report_key: string
          snapshot_count: number
        }[]
      }
      consultant_convert_client: {
        Args: { p_client_id: string; p_workplace_id: string }
        Returns: Json
      }
      consultant_day_in_month: {
        Args: { p_day: number; p_month_start: string }
        Returns: string
      }
      consultant_fiscal_quarter: { Args: { p_date: string }; Returns: number }
      consultant_fy_label: { Args: { p_date: string }; Returns: string }
      consultant_fy_label_for_year: {
        Args: { p_start_year: number }
        Returns: string
      }
      consultant_fy_start_year: { Args: { p_date: string }; Returns: number }
      consultant_generate_client_calendar: {
        Args: {
          p_client_id: string
          p_from: string
          p_tags?: string[]
          p_to: string
        }
        Returns: Json
      }
      consultant_holds_client: {
        Args: { p_client_id: string }
        Returns: boolean
      }
      consultant_holds_client_path: {
        Args: { p_object_name: string }
        Returns: boolean
      }
      consultant_holds_link: { Args: { p_link_id: string }; Returns: boolean }
      consultant_in_firm: { Args: { p_firm_id: string }; Returns: boolean }
      consultant_inbox: { Args: never; Returns: Json }
      consultant_link_participant: {
        Args: { p_link_id: string }
        Returns: boolean
      }
      consultant_link_thread_client: {
        Args: { p_client_id: string; p_thread_id: string }
        Returns: undefined
      }
      consultant_mark_thread_read: {
        Args: { p_thread_id: string }
        Returns: undefined
      }
      consultant_my_client_ids: { Args: never; Returns: string[] }
      consultant_my_clients: {
        Args: never
        Returns: {
          accepted_at: string
          entity_type: string
          firm_name: string
          gstin: string
          link_id: string
          report_count: number
          status: string
          workplace_id: string
          workplace_name: string
        }[]
      }
      consultant_my_firm: { Args: never; Returns: Json }
      consultant_my_managed_clients: {
        Args: never
        Returns: {
          city: string
          contact_name: string
          converted_at: string
          converted_workplace_id: string
          created_at: string
          email: string
          entity_type: string
          file_count: number
          firm_id: string
          gstin: string
          id: string
          is_owner: boolean
          name: string
          next_due_date: string
          notes: string
          open_reminder_count: number
          pan: string
          phone_e164: string
          state: string
          status: string
          updated_at: string
        }[]
      }
      consultant_my_payment_details: { Args: never; Returns: Json }
      consultant_my_work: {
        Args: never
        Returns: {
          created_at: string
          detail: string
          due_date: string
          kind: string
          link_id: string
          ref_id: string
          title: string
          workplace_id: string
          workplace_name: string
        }[]
      }
      consultant_open_report: {
        Args: {
          p_financial_year?: string
          p_report_key: string
          p_workplace_id: string
        }
        Returns: Json
      }
      consultant_open_thread: {
        Args: {
          p_connection_id: string
          p_display_name?: string
          p_phone_e164: string
        }
        Returns: string
      }
      consultant_owns_firm: { Args: { p_firm_id: string }; Returns: boolean }
      consultant_owns_whatsapp: {
        Args: { p_connection_id: string }
        Returns: boolean
      }
      consultant_practice_report: {
        Args: { p_from?: string; p_kind: string; p_to?: string }
        Returns: Json
      }
      consultant_queue_due_reminders: {
        Args: { p_lead_days?: number; p_limit?: number }
        Returns: Json
      }
      consultant_queue_whatsapp_reply: {
        Args: { p_body: string; p_thread_id: string }
        Returns: number
      }
      consultant_request_document: {
        Args: {
          p_due_date?: string
          p_link_id: string
          p_note?: string
          p_title: string
        }
        Returns: string
      }
      consultant_save_client: {
        Args: {
          p_city?: string
          p_client_id?: string
          p_contact_name?: string
          p_email?: string
          p_entity_type?: string
          p_firm_id?: string
          p_gstin?: string
          p_name: string
          p_notes?: string
          p_pan?: string
          p_phone_e164?: string
          p_state?: string
        }
        Returns: string
      }
      consultant_save_payment_details: {
        Args: {
          p_bank_account_name?: string
          p_bank_account_number?: string
          p_bank_ifsc?: string
          p_firm_id?: string
          p_payment_note?: string
          p_upi_id?: string
        }
        Returns: undefined
      }
      consultant_thread: { Args: { p_thread_id: string }; Returns: Json }
      consultant_thread_window: { Args: { p_thread_id: string }; Returns: Json }
      consultant_weekly_digest: {
        Args: { p_dry_run?: boolean; p_limit?: number }
        Returns: Json
      }
      consultant_whatsapp_overview: { Args: never; Returns: Json }
      contract_is_completed: {
        Args: { p_contract_id: string }
        Returns: boolean
      }
      create_agent_proposed_action: {
        Args: {
          p_action_type?: string
          p_agent_id?: string
          p_amplify_project_id?: string
          p_created_by_id?: string
          p_created_by_type?: string
          p_payload?: Json
          p_risk_level?: string
          p_source_id?: string
          p_source_type?: string
          p_summary?: string
          p_task_id?: string
          p_title?: string
          p_workplace_id: string
        }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_app_notification: {
        Args: {
          p_content: string
          p_link?: string
          p_profile_id: string
          p_title: string
          p_type: string
          p_workplace_id?: string
        }
        Returns: string
      }
      create_consultant_firm: { Args: { p_name: string }; Returns: string }
      create_document_share_token: {
        Args: {
          p_bucket: string
          p_path: string
          p_resource_id?: string
          p_resource_type?: string
          p_ttl_hours?: number
        }
        Returns: string
      }
      create_invoice_share_token: {
        Args: { p_invoice_id: string; p_ttl_hours?: number }
        Returns: string
      }
      create_pos_checkout: {
        Args: {
          p_applied_discount_id?: string
          p_cgst_amount?: number
          p_created_by?: string
          p_customer_gstin?: string
          p_customer_id?: string
          p_customer_name?: string
          p_customer_phone?: string
          p_discount_amount?: number
          p_goods_delivered?: boolean
          p_igst_amount?: number
          p_items?: Json
          p_location_id: string
          p_loyalty_contact_id?: string
          p_loyalty_earn_points?: number
          p_loyalty_redeem_points?: number
          p_loyalty_redemption_discount?: number
          p_loyalty_tier_id?: string
          p_notes?: string
          p_payments?: Json
          p_session_id: string
          p_sgst_amount?: number
          p_subtotal?: number
          p_tax_total?: number
          p_terminal_id: string
          p_tier_discount_amount?: number
          p_total?: number
          p_workplace_id: string
        }
        Returns: Json
      }
      create_reorder_purchase_order: {
        Args: {
          p_product_id: string
          p_quantity?: number
          p_workplace_id: string
        }
        Returns: Json
      }
      create_workplace_mcp_token: {
        Args: { p_name: string; p_scopes?: string[]; p_workplace_id: string }
        Returns: {
          created_at: string
          id: string
          raw_token: string
          scopes: string[]
          token_prefix: string
        }[]
      }
      current_profile_role: { Args: never; Returns: string }
      custom_domain_serveable: { Args: { p_host: string }; Returns: boolean }
      deactivate_workplace_subscription: {
        Args: { p_status?: string; p_workplace_id: string }
        Returns: undefined
      }
      decrement_stock: {
        Args: {
          p_location_id?: string
          p_product_id: string
          p_quantity: number
        }
        Returns: undefined
      }
      default_compliance_due_date: {
        Args: {
          p_due_date_logic: string
          p_frequency: string
          p_period_end: string
          p_period_start: string
          p_specific_date: string
        }
        Returns: string
      }
      delete_workplace_ai_provider: {
        Args: { p_workplace_id: string }
        Returns: undefined
      }
      disconnect_consultant_whatsapp: {
        Args: { p_connection_id: string }
        Returns: undefined
      }
      dispatch_due_agent_tasks: { Args: { p_limit?: number }; Returns: Json }
      ensure_amplify_default_agents: {
        Args: { p_workplace_id: string }
        Returns: {
          apps: Json | null
          archived_at: string | null
          archived_by: string | null
          avatar_url: string | null
          created_at: string | null
          department: string
          id: string
          instructions: string
          max_concurrent_tasks: number
          model: string
          name: string
          status: string
          updated_at: string | null
          visibility: string
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      ensure_amplify_default_stages: {
        Args: { p_workplace_id: string }
        Returns: {
          archived_at: string | null
          color: string | null
          created_at: string
          created_by_agent_id: string | null
          created_by_id: string | null
          created_by_type: string
          description: string | null
          icon: string | null
          id: string
          is_default: boolean
          key: string
          label: string
          metadata: Json
          sort_order: number
          status: string
          updated_at: string
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "amplify_stages"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      ensure_compliance_instance_work_item: {
        Args: {
          p_assigned_to?: string
          p_instance_id: string
          p_request_jri_support?: boolean
          p_requested_by?: string
        }
        Returns: {
          assignment_id: string
          dependency_status: string
          instance_id: string
          support_ticket_id: string
          vault_folder_id: string
        }[]
      }
      expire_platform_subscriptions: {
        Args: { p_grace_days?: number }
        Returns: number
      }
      expire_store_credits: { Args: { p_workplace_id?: string }; Returns: Json }
      fail_agent_task: {
        Args: {
          p_error: string
          p_failure_reason?: string
          p_result?: Json
          p_task_id: string
        }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      finalize_pos_return: {
        Args: {
          p_finalization_request_id: string
          p_item_approvals: Json
          p_refund_evidence?: Json
          p_refund_method: string
          p_return_id: string
          p_review_notes: string
        }
        Returns: Json
      }
      finalize_purchase_match: {
        Args: {
          p_amount_tolerance?: number
          p_effective_at: string
          p_goods_receipt_note_id: string
          p_idempotency_key: string
          p_purchase_order_id: string
          p_quantity_tolerance?: number
          p_source_version?: number
          p_unit_price_tolerance?: number
          p_vendor_bill_id: string
          p_workplace_id: string
        }
        Returns: string
      }
      fulfil_consultant_document_request: {
        Args: { p_document_path: string; p_request_id: string }
        Returns: undefined
      }
      generate_bill_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      generate_credit_note_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      generate_grn_number: { Args: { p_workplace_id: string }; Returns: string }
      generate_invoice_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      generate_po_number: { Args: { p_workplace_id: string }; Returns: string }
      generate_pos_hold_number: {
        Args: { p_terminal_id: string }
        Returns: string
      }
      generate_pos_transaction_number: {
        Args: { p_terminal_id: string }
        Returns: string
      }
      generate_product_barcode: {
        Args: { p_barcode_type?: string; p_product_id: string }
        Returns: string
      }
      generate_receipt_voucher_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      generate_stock_take_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      generate_vendor_bill_number: {
        Args: { p_workplace_id: string }
        Returns: string
      }
      get_account_balances_as_of: {
        Args: {
          p_account_id?: string
          p_effective_as_of: string
          p_recorded_as_of?: string
          p_workplace_id: string
        }
        Returns: {
          account_code: string
          account_id: string
          account_name: string
          account_type: string
          debit_minus_credit: number
          event_count: number
          normal_balance: string
          normal_balance_amount: number
          total_credit: number
          total_debit: number
        }[]
      }
      get_accounting_activation_status: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_accounting_trial_balance: {
        Args: { p_from: string; p_to: string; p_workplace_id: string }
        Returns: {
          account_code: string
          account_id: string
          account_name: string
          account_subtype: string
          account_type: string
          closing_balance: number
          normal_balance: string
          opening_balance: number
          period_credit: number
          period_debit: number
          system_key: string
        }[]
      }
      get_admin_dashboard_summary: { Args: { p_days?: number }; Returns: Json }
      get_admin_support_queue_summary: { Args: never; Returns: Json }
      get_agent_action_policy: {
        Args: {
          p_action_type: string
          p_risk_level?: string
          p_source_type?: string
        }
        Returns: Json
      }
      get_ai_actions_today: {
        Args: { p_workplace_id: string }
        Returns: number
      }
      get_ai_credits_used: {
        Args: { p_period?: string; p_workplace_id: string }
        Returns: number
      }
      get_amplify_banking_context: {
        Args: {
          p_end_date?: string
          p_start_date?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_compliance_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_amplify_compliance_workspace_context: {
        Args: { p_limit?: number; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_console_summary: {
        Args: {
          p_end_date?: string
          p_start_date?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_contract_context: {
        Args: { p_contract_id?: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_growth_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_amplify_inventory_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_amplify_invoice_context: {
        Args: {
          p_end_date?: string
          p_start_date?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_offerings_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_amplify_payroll_context: {
        Args: {
          p_end_date?: string
          p_start_date?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_project_context: {
        Args: { p_project_id: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_project_progress: {
        Args: { p_project_id: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_purchase_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_amplify_source_record: {
        Args: {
          p_source_id: string
          p_source_type: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_source_record_base_20260526: {
        Args: {
          p_source_id: string
          p_source_type: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_amplify_stage_context: {
        Args: { p_stage_key: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_support_context: {
        Args: { p_ticket_id?: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_system_context: {
        Args: { p_system_key: string; p_workplace_id: string }
        Returns: Json
      }
      get_amplify_workplace_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_app_backend: {
        Args: { p_app_id: string }
        Returns: {
          anon_key: string
          project_url: string
        }[]
      }
      get_app_by_custom_domain: {
        Args: { p_host: string }
        Returns: {
          app_id: string
          files: Json
        }[]
      }
      get_app_by_member_share_token: {
        Args: { p_token: string }
        Returns: {
          backend_mode: string
          data_access: boolean
          data_snapshot: Json
          files: Json
          id: string
        }[]
      }
      get_applicable_compliance_rules: {
        Args: { p_workplace_id: string }
        Returns: {
          rule_id: string
        }[]
      }
      get_bank_ledger_period_balances: {
        Args: {
          p_bank_account_id?: string
          p_period_end: string
          p_period_start: string
          p_workplace_id: string
        }
        Returns: {
          bank_account_id: string
          period_closing_balance: number
          period_entry_count: number
          period_inflows: number
          period_net: number
          period_opening_balance: number
          period_outflows: number
        }[]
      }
      get_billable_seat_count: {
        Args: { p_workplace_id: string }
        Returns: number
      }
      get_buyer_fy_receipts: {
        Args: {
          p_as_of_date: string
          p_contact_id: string
          p_exclude_invoice_id?: string
          p_workplace_id: string
        }
        Returns: number
      }
      get_contract_for_signing: {
        Args: { p_contract_id: string; p_otp: string }
        Returns: {
          description: string
          generated_pdf_url: string
          id: string
          markdown_content: string
          original_file_url: string
          title: string
          workplace_id: string
        }[]
      }
      get_contract_generations_this_month: {
        Args: { p_workplace_id: string }
        Returns: number
      }
      get_contract_signatures_used: {
        Args: { p_workplace_id: string }
        Returns: number
      }
      get_contract_signing_preview: {
        Args: { p_contract_id: string; p_otp: string }
        Returns: {
          contract_id: string
          contract_title: string
          sender_email: string
          sender_name: string
          signatory_email: string
          signatory_name: string
        }[]
      }
      get_customer_store_credit: {
        Args: { p_customer_id: string; p_workplace_id: string }
        Returns: {
          credit_number: string
          current_balance: number
          expiry_date: string
          source_reference: string
          store_credit_id: string
        }[]
      }
      get_discount_breakdown: {
        Args: { p_from?: string; p_to?: string; p_workplace_id: string }
        Returns: {
          discount_id: string
          invoice_count: number
          label: string
          source: string
          total_given: number
        }[]
      }
      get_e_invoice_lifecycle_as_of: {
        Args: {
          p_invoice_id: string
          p_recorded_as_of?: string
          p_workplace_id: string
        }
        Returns: {
          acknowledgement_at: string
          acknowledgement_number: string
          cancellation_reason: string
          cancellation_reference: string
          effective_at: string
          failure_code: string
          failure_message: string
          irn: string
          lifecycle_event: string
          lifecycle_event_id: string
          provider_key: string
          provider_reference: string
          recorded_at: string
          response_hash: string
          signed_invoice_path: string
          signed_qr_path: string
          source_version: number
        }[]
      }
      get_financial_console_summary: {
        Args: {
          p_end_date: string
          p_previous_end_date: string
          p_previous_start_date: string
          p_start_date: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_fixed_asset_balances_as_of: {
        Args: {
          p_effective_as_of: string
          p_fixed_asset_id?: string
          p_recorded_as_of?: string
          p_workplace_id: string
        }
        Returns: {
          accumulated_depreciation: number
          asset_code: string
          asset_name: string
          event_count: number
          fixed_asset_id: string
          gross_value: number
          net_book_value: number
        }[]
      }
      get_indian_financial_year: { Args: { p_date: string }; Returns: string }
      get_indian_fy_quarter: { Args: { p_date: string }; Returns: string }
      get_inventory_valuation_as_of: {
        Args: {
          p_effective_cutoff: string
          p_product_id?: string
          p_recorded_cutoff: string
          p_workplace_id: string
        }
        Returns: {
          event_count: number
          inventory_value: number
          latest_effective_at: string
          latest_recorded_at: string
          location_id: string
          product_id: string
          quantity: number
          weighted_average_cost: number
        }[]
      }
      get_invite_preview: { Args: { p_token: string }; Returns: Json }
      get_invoice_payment_summary: {
        Args: { p_invoice_id: string }
        Returns: {
          balance_due: number
          is_fully_paid: boolean
          last_payment_date: string
          paid_amount: number
          payment_count: number
          total_amount: number
        }[]
      }
      get_latest_business_context: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_notification_summary: {
        Args: { p_profile_id?: string }
        Returns: Json
      }
      get_party_ledger_as_of: {
        Args: {
          p_contact_id: string
          p_effective_as_of: string
          p_recorded_as_of?: string
          p_workplace_id: string
        }
        Returns: {
          account_code: string
          account_id: string
          account_name: string
          effective_at: string
          event_id: string
          event_type: string
          line_id: number
          memo: string
          party_amount: number
          party_role: string
          recorded_at: string
          reverses_event_id: string
          running_party_balance: number
          source_id: string
          source_type: string
          source_version: number
        }[]
      }
      get_platform_ai_ops: { Args: { p_period?: string }; Returns: Json }
      get_platform_flag: { Args: { p_key: string }; Returns: boolean }
      get_pos_return_review_summary: {
        Args: { p_review_statuses?: string[]; p_workplace_id: string }
        Returns: Json
      }
      get_pos_session_close_summary: {
        Args: { p_session_id: string }
        Returns: Json
      }
      get_public_invoice:
        | { Args: { p_invoice_id: string }; Returns: Json }
        | {
            Args: { p_invoice_id: string; p_share_token: string }
            Returns: Json
          }
      get_published_app: {
        Args: { p_slug: string }
        Returns: {
          app_id: string
          backend_mode: string
          data_access: boolean
          data_snapshot: Json
          files: Json
        }[]
      }
      get_signatory_for_signing: {
        Args: { p_contract_id: string; p_otp: string }
        Returns: {
          contract_id: string
          email: string
          failed_otp_attempts: number
          id: string
          name: string
          otp_expires_at: string
          signature_type: string
          signed_at: string
          status: string
        }[]
      }
      get_store_credit_summary: {
        Args: { p_workplace_id: string }
        Returns: {
          expired_unspent_total: number
          expiring_30d_total: number
          issued_total: number
          outstanding_count: number
          outstanding_total: number
          redeemed_total: number
        }[]
      }
      get_subscriptions_needing_renewal: {
        Args: { p_days_ahead?: number }
        Returns: {
          billing_period: string
          period_end: string
          period_months: number
          plan_code: string
          plan_name: string
          unit_price_inr: number
          workplace_id: string
          workplace_name: string
        }[]
      }
      get_task_evidence: { Args: { p_task_id: string }; Returns: Json }
      get_terminal_open_session: {
        Args: { p_terminal_id: string }
        Returns: string
      }
      get_user_bootstrap: { Args: { user_id: string }; Returns: Json }
      get_vendor_bill_summary: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_vendor_return_financial_position_as_of: {
        Args: {
          p_effective_as_of: string
          p_recorded_as_of?: string
          p_vendor_return_id: string
          p_workplace_id: string
        }
        Returns: {
          accepted_stock_quantity_delta: number
          event_count: number
          input_tax_amount_delta: number
          payable_amount_delta: number
        }[]
      }
      get_withholding_balances_as_of: {
        Args: {
          p_effective_as_of: string
          p_recorded_as_of?: string
          p_workplace_id: string
        }
        Returns: {
          direction: string
          event_count: number
          section_code: string
          tax_balance: number
          tax_kind: string
        }[]
      }
      get_workplace_ai_key: {
        Args: { p_workplace_id: string }
        Returns: {
          api_key: string
          base_url: string
          model: string
        }[]
      }
      get_workplace_ai_provider: {
        Args: { p_workplace_id: string }
        Returns: {
          base_url: string
          connected: boolean
          label: string
          model: string
        }[]
      }
      get_workplace_compliance_summary: {
        Args: {
          p_window_end?: string
          p_window_start?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_workplace_document_summary: {
        Args: { p_folder_id?: string; p_workplace_id: string }
        Returns: Json
      }
      get_workplace_quota: {
        Args: { p_key: string; p_workplace_id: string }
        Returns: number
      }
      get_workplace_staff_roster_summary: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_workplace_storage_usage: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_workplace_support_ticket_summary: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      get_workplace_tax_console_summary: {
        Args: {
          p_end_date: string
          p_start_date: string
          p_workplace_id: string
        }
        Returns: Json
      }
      get_workplace_tax_detail_entries: {
        Args: {
          p_end_date: string
          p_limit?: number
          p_offset?: number
          p_start_date: string
          p_tax_type: string
          p_workplace_id: string
        }
        Returns: Json
      }
      grant_consultant_report: {
        Args: {
          p_expires_at?: string
          p_financial_year?: string
          p_link_id: string
          p_report_key: string
        }
        Returns: string
      }
      has_module: {
        Args: { p_action?: string; p_module: string; p_workplace_id: string }
        Returns: boolean
      }
      heartbeat_agent_task: {
        Args: {
          p_lease_seconds?: number
          p_runtime_id?: string
          p_task_id: string
        }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      increment_contract_signatory_failed_attempts: {
        Args: { p_contract_id: string; p_signatory_id: string }
        Returns: undefined
      }
      increment_discount_usage: {
        Args: { p_discount_id: string; p_workplace_id: string }
        Returns: Json
      }
      increment_signing_failed_attempts: {
        Args: { p_contract_id: string; p_otp: string }
        Returns: undefined
      }
      initialize_accounting_chart: {
        Args: { p_created_by: string; p_workplace_id: string }
        Returns: number
      }
      invite_workplace_consultant: {
        Args: {
          p_email: string
          p_firm_name?: string
          p_ttl_days?: number
          p_workplace_id: string
        }
        Returns: Json
      }
      is_approved_workplace_member: {
        Args: { p_workplace_id: string }
        Returns: boolean
      }
      is_platform_admin: { Args: never; Returns: boolean }
      is_platform_professional: { Args: never; Returns: boolean }
      is_platform_staff: { Args: never; Returns: boolean }
      is_team_head: { Args: { p_workplace_id: string }; Returns: boolean }
      is_workplace_member: { Args: { wp_id: string }; Returns: boolean }
      issue_store_credit: {
        Args: {
          p_amount: number
          p_customer_id: string
          p_expiry_days?: number
          p_notes?: string
          p_source_type?: string
          p_workplace_id: string
        }
        Returns: Json
      }
      link_tcs_entries_to_challan: {
        Args: { p_challan_id: string; p_entry_ids: string[] }
        Returns: undefined
      }
      link_tds_entries_to_challan: {
        Args: { p_challan_id: string; p_entry_ids: string[] }
        Returns: undefined
      }
      link_withholding_document: {
        Args: {
          p_withholding_document_id: string
          p_withholding_event_id: string
          p_workplace_id: string
        }
        Returns: undefined
      }
      list_app_member_shares: {
        Args: { p_app_id: string }
        Returns: {
          created_at: string
          expires_at: string
          id: string
          label: string
          revoked_at: string
          token_prefix: string
        }[]
      }
      list_store_credits: {
        Args: { p_workplace_id: string }
        Returns: {
          credit_number: string
          current_balance: number
          customer_id: string
          customer_name: string
          expiry_date: string
          issued_date: string
          original_amount: number
          source_reference: string
          source_type: string
          state: string
          store_credit_id: string
          used_amount: number
        }[]
      }
      list_workplace_mcp_tokens: {
        Args: { p_workplace_id: string }
        Returns: {
          created_at: string
          id: string
          last_used_at: string
          name: string
          revoked_at: string
          scopes: string[]
          token_prefix: string
        }[]
      }
      match_funding: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          category: string
          fund_name: string
          funding_amount: string
          id: string
          similarity: number
          timeline: string
        }[]
      }
      match_packages: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          description: string
          duration_months: number
          entity_type: string
          final_price: number
          id: string
          name: string
          plan_name: string
          similarity: number
          why_choose: string
        }[]
      }
      match_services: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          category: string
          description: string
          government_fee: number
          id: string
          price: number
          service_name: string
          similarity: number
          timeline: string
          who_it_is_for: string
          why_it_is_needed: string
        }[]
      }
      mcp_claim_approved_action: {
        Args: {
          p_action_id: string
          p_action_type: string
          p_workplace_id: string
        }
        Returns: Json
      }
      mcp_resolve_tool_tier: {
        Args: { p_tool_name: string; p_workplace_id: string }
        Returns: string
      }
      mint_app_member_share: {
        Args: { p_app_id: string; p_label?: string; p_ttl_hours?: number }
        Returns: string
      }
      mint_internal_app_data_token: {
        Args: { p_app_id: string }
        Returns: string
      }
      monitor_agent_autopilot_failures: {
        Args: { p_failure_threshold?: number; p_window_hours?: number }
        Returns: Json
      }
      next_jri_invoice_number: { Args: never; Returns: string }
      next_staff_payroll_run_date: {
        Args: { p_day_of_month: number; p_run_date: string }
        Returns: string
      }
      normalize_amplify_execution_mode: {
        Args: { p_mode: string }
        Returns: string
      }
      normalize_compliance_frequency: {
        Args: { p_periodicity: string }
        Returns: string
      }
      notify_consultant: {
        Args: {
          p_content: string
          p_link?: string
          p_profile_id: string
          p_title: string
          p_type: string
          p_workplace_id?: string
        }
        Returns: string
      }
      notify_workplace_heads: {
        Args: {
          p_content: string
          p_link: string
          p_title: string
          p_type: string
          p_workplace_id: string
        }
        Returns: undefined
      }
      post_accounting_event: {
        Args: {
          p_description?: string
          p_effective_at: string
          p_event_type: string
          p_idempotency_key?: string
          p_lines: Json
          p_metadata?: Json
          p_source_id: string
          p_source_type: string
          p_source_version?: number
          p_workplace_id: string
        }
        Returns: string
      }
      post_accounting_source_capture: {
        Args: { p_capture_id: string }
        Returns: {
          accounting_event_id: string | null
          created_at: string
          error: string | null
          id: string
          payload: Json
          payload_hash: string
          processed_at: string | null
          resolution: string | null
          reversal_event_id: string | null
          source_id: string
          source_operation: string
          source_recorded_at: string
          source_table: string
          source_version: number
          status: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "accounting_source_captures"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      post_consultant_message: {
        Args: { p_body: string; p_thread_id: string }
        Returns: number
      }
      post_fixed_asset_event: {
        Args: {
          p_accounting_event_id?: string
          p_accumulated_depreciation_delta: number
          p_effective_at: string
          p_event_type: string
          p_fixed_asset_id: string
          p_gross_value_delta: number
          p_idempotency_key?: string
          p_metadata?: Json
          p_source_id: string
          p_source_type: string
          p_source_version?: number
          p_workplace_id: string
        }
        Returns: string
      }
      post_inventory_valuation_event: {
        Args: {
          p_cost_basis: string
          p_effective_at: string
          p_event_type: string
          p_idempotency_key?: string
          p_location_id: string
          p_metadata?: Json
          p_product_id: string
          p_quantity_delta: number
          p_reverses_event_id?: string
          p_source_id: string
          p_source_line_id?: string
          p_source_type: string
          p_source_version?: number
          p_unit_cost: number
          p_workplace_id: string
        }
        Returns: string
      }
      post_party_opening_balance: {
        Args: {
          p_amount: number
          p_contact_id: string
          p_description?: string
          p_effective_at: string
          p_idempotency_key?: string
          p_offset_account_id: string
          p_party_account_id: string
          p_party_role: string
          p_workplace_id: string
        }
        Returns: string
      }
      post_withholding_lifecycle_event: {
        Args: {
          p_accounting_event_id?: string
          p_contact_id?: string
          p_direction: string
          p_effective_at: string
          p_gross_amount?: number
          p_idempotency_key?: string
          p_invoice_id?: string
          p_lifecycle_event: string
          p_metadata?: Json
          p_section_code?: string
          p_source_id: string
          p_source_type: string
          p_source_version?: number
          p_tax_amount_delta: number
          p_tax_kind: string
          p_vendor_bill_id?: string
          p_workplace_id: string
        }
        Returns: string
      }
      preview_consultant_access: { Args: { p_link_id: string }; Returns: Json }
      preview_professional_access: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      process_accounting_source_captures: {
        Args: { p_batch_size?: number; p_workplace_id: string }
        Returns: {
          error_count: number
          posted_count: number
          skipped_count: number
        }[]
      }
      process_due_staff_payroll_schedules: {
        Args: { p_workplace_id?: string }
        Returns: number
      }
      process_grn_inventory_update: {
        Args: { p_grn_id: string; p_updated_by: string }
        Returns: Json
      }
      process_pos_return_inventory: {
        Args: {
          p_item_approvals?: Json
          p_mark_completed?: boolean
          p_refund_method?: string
          p_return_id: string
          p_review_notes?: string
          p_reviewed_by: string
        }
        Returns: Json
      }
      process_recurring_invoices: {
        Args: never
        Returns: {
          invoice_id: string
          message: string
          schedule_id: string
          status: string
        }[]
      }
      process_workplace_compliance_instance_reminders: {
        Args: { p_days_ahead?: number; p_workplace_id: string }
        Returns: number
      }
      professional_ticket_modules: { Args: never; Returns: string[] }
      purge_old_read_notifications: {
        Args: { p_older_than_days?: number }
        Returns: number
      }
      queue_consultant_whatsapp: {
        Args: {
          p_body_preview?: string
          p_connection_id: string
          p_params?: string[]
          p_phone_e164: string
          p_purpose: string
          p_workplace_id?: string
        }
        Returns: number
      }
      recalculate_bank_balance: {
        Args: { p_bank_account_id: string }
        Returns: number
      }
      reconcile_bank_statement_line: {
        Args: {
          p_source_id: string
          p_source_type: string
          p_statement_line_id: string
        }
        Returns: {
          amount: number
          bank_account_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          matched_to: string | null
          matched_type: string | null
          reference: string | null
          running_balance: number | null
          statement_id: string
          updated_at: string | null
          workplace_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "bank_statement_lines"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      reconcile_professional_ticket_access: {
        Args: { p_workplace_id?: string }
        Returns: Json
      }
      reconcile_subscription_invoices: { Args: never; Returns: number }
      record_ai_usage: {
        Args: {
          p_correlation_id?: string
          p_cost_inr?: number
          p_credits?: number
          p_feature?: string
          p_latency_ms?: number
          p_model?: string
          p_success?: boolean
          p_surface?: string
          p_tokens_in?: number
          p_tokens_out?: number
          p_user_id?: string
          p_workplace_id: string
        }
        Returns: undefined
      }
      record_consultant_filing: {
        Args: {
          p_acknowledgement_ref?: string
          p_evidence_path?: string
          p_instance_id?: string
          p_link_id: string
          p_notes?: string
          p_period_label?: string
          p_title: string
        }
        Returns: string
      }
      record_e_invoice_lifecycle_event: {
        Args: {
          p_acknowledgement_at?: string
          p_acknowledgement_number?: string
          p_cancellation_reason?: string
          p_cancellation_reference?: string
          p_effective_at: string
          p_failure_code?: string
          p_failure_message?: string
          p_idempotency_key: string
          p_invoice_id: string
          p_irn?: string
          p_lifecycle_event: string
          p_metadata?: Json
          p_provider_key?: string
          p_provider_reference?: string
          p_response_hash?: string
          p_signed_invoice_path?: string
          p_signed_qr_path?: string
          p_source_version?: number
          p_workplace_id: string
        }
        Returns: string
      }
      record_manual_restock: {
        Args: {
          p_gst_amount?: number
          p_location_id: string
          p_product_id: string
          p_quantity: number
          p_request_id: string
          p_unit_cost: number
          p_vendor_id: string
          p_workplace_id: string
        }
        Returns: Json
      }
      record_pos_delivery_inventory_deduction: {
        Args: { p_created_by?: string; p_transaction_id: string }
        Returns: Json
      }
      record_push_delivery_result: {
        Args: {
          p_error?: string
          p_notification_id: string
          p_provider_status?: number
          p_status: string
          p_subscription_id: string
        }
        Returns: Json
      }
      record_subscription_renewal_link: {
        Args: {
          p_for_period: string
          p_invoice_id?: string
          p_link_id: string
          p_link_url: string
          p_workplace_id: string
        }
        Returns: undefined
      }
      record_tax_challan: {
        Args: {
          p_bank_name?: string
          p_bsr_code: string
          p_challan_no: string
          p_challan_serial_no: string
          p_challan_type: string
          p_deposit_date: string
          p_education_cess_amount?: number
          p_entry_ids: string[]
          p_interest_amount?: number
          p_penalty_amount?: number
          p_remarks?: string
          p_surcharge_amount?: number
          p_workplace_id: string
        }
        Returns: string
      }
      record_vendor_bill_payment: {
        Args: {
          p_amount: number
          p_bank_account_id?: string
          p_notes?: string
          p_payment_date: string
          p_payment_method: string
          p_reference_number?: string
          p_vendor_bill_id: string
        }
        Returns: Json
      }
      record_vendor_return_financial_event: {
        Args: {
          p_accepted_stock_quantity_delta: number
          p_accounting_event_id?: string
          p_debit_note_id?: string
          p_effective_at: string
          p_idempotency_key: string
          p_input_tax_amount_delta: number
          p_inventory_valuation_event_id?: string
          p_lifecycle_event: string
          p_metadata?: Json
          p_payable_amount_delta: number
          p_source_id: string
          p_source_type: string
          p_source_version?: number
          p_vendor_bill_id?: string
          p_vendor_return_id: string
          p_workplace_id: string
        }
        Returns: string
      }
      record_whatsapp_inbound: {
        Args: {
          p_body?: string
          p_display_name?: string
          p_from_phone: string
          p_media_id?: string
          p_media_mime?: string
          p_message_type: string
          p_phone_number_id: string
          p_provider_message_id: string
          p_raw?: Json
          p_received_at?: string
        }
        Returns: Json
      }
      record_whatsapp_optin: {
        Args: {
          p_connection_id: string
          p_display_name?: string
          p_phone_e164: string
          p_workplace_id?: string
        }
        Returns: string
      }
      record_whatsapp_optout: {
        Args: { p_connection_id: string; p_phone_e164: string }
        Returns: undefined
      }
      record_whatsapp_status: {
        Args: {
          p_at?: string
          p_error?: string
          p_phone_number_id: string
          p_provider_message_id: string
          p_status: string
        }
        Returns: Json
      }
      record_withholding_document: {
        Args: {
          p_document_date?: string
          p_document_path?: string
          p_document_type: string
          p_external_reference: string
          p_metadata?: Json
          p_period_end?: string
          p_period_start?: string
          p_workplace_id: string
        }
        Returns: string
      }
      recover_stale_agent_tasks: {
        Args: { p_limit?: number; p_workplace_id?: string }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      redeem_document_share_token: {
        Args: { p_raw_token: string }
        Returns: {
          bucket: string
          object_path: string
        }[]
      }
      redeem_store_credit: {
        Args: {
          p_actor?: string
          p_amount: number
          p_customer_id?: string
          p_pos_transaction_id: string
          p_store_credit_id: string
          p_workplace_id: string
        }
        Returns: Json
      }
      refresh_amplify_criteria: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      register_fixed_asset: {
        Args: {
          p_acquisition_date?: string
          p_asset_code: string
          p_description?: string
          p_metadata?: Json
          p_name: string
          p_placed_in_service_date?: string
          p_source_id?: string
          p_source_type?: string
          p_workplace_id: string
        }
        Returns: string
      }
      register_push_subscription: {
        Args: {
          p_auth_key: string
          p_endpoint: string
          p_expires_at?: string
          p_p256dh: string
          p_user_agent?: string
        }
        Returns: string
      }
      reject_agent_proposed_action: {
        Args: { p_action_id: string; p_reason?: string }
        Returns: {
          action_type: string
          agent_id: string | null
          amplify_project_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string
          created_by_id: string | null
          created_by_type: string
          decided_at: string | null
          error: string | null
          id: string
          payload: Json
          rejected_by: string | null
          risk_level: string
          source_id: string | null
          source_type: string | null
          status: string
          summary: string | null
          task_id: string | null
          title: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "agent_proposed_actions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      reject_due_config_proposal: {
        Args: { p_note?: string; p_rule_id: string }
        Returns: Json
      }
      remove_consultant_firm_member: {
        Args: { p_firm_id: string; p_profile_id: string }
        Returns: undefined
      }
      remove_push_subscription: {
        Args: { p_endpoint: string }
        Returns: boolean
      }
      resolve_accounting_source_capture: {
        Args: { p_capture_id: string; p_resolution: string; p_status: string }
        Returns: {
          accounting_event_id: string | null
          created_at: string
          error: string | null
          id: string
          payload: Json
          payload_hash: string
          processed_at: string | null
          resolution: string | null
          reversal_event_id: string | null
          source_id: string
          source_operation: string
          source_recorded_at: string
          source_table: string
          source_version: number
          status: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "accounting_source_captures"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      resolve_entity_type_id: { Args: { p_text: string }; Returns: string }
      resolve_industry_id: { Args: { p_text: string }; Returns: string }
      resolve_sub_industry_id: {
        Args: { p_industry_id: string; p_text: string }
        Returns: string
      }
      reverse_accounting_event: {
        Args: {
          p_description?: string
          p_effective_at: string
          p_event_id: string
          p_idempotency_key?: string
          p_metadata?: Json
          p_source_id: string
          p_source_type: string
          p_source_version?: number
          p_workplace_id: string
        }
        Returns: string
      }
      reverse_pos_return_loyalty: {
        Args: { p_actor?: string; p_return_id: string }
        Returns: Json
      }
      revoke_app_member_share: { Args: { p_id: string }; Returns: undefined }
      revoke_closed_account_signin: {
        Args: { p_profile_id: string }
        Returns: undefined
      }
      revoke_consultant_report: {
        Args: { p_grant_id: string }
        Returns: undefined
      }
      revoke_invoice_share_tokens: {
        Args: { p_invoice_id: string }
        Returns: number
      }
      revoke_workplace_consultant: {
        Args: { p_link_id: string }
        Returns: undefined
      }
      revoke_workplace_mcp_token: {
        Args: { p_token_id: string }
        Returns: undefined
      }
      run_amplify_background_maintenance: {
        Args: {
          p_include_all_workplaces?: boolean
          p_recover_stale_tasks?: boolean
          p_refresh_criteria?: boolean
          p_task_recovery_limit?: number
          p_workplace_limit?: number
        }
        Returns: Json
      }
      run_due_agent_autopilots: { Args: { p_limit?: number }; Returns: Json }
      save_invoice_draft: {
        Args: {
          p_invoice: Json
          p_invoice_id?: string
          p_line_items: Json
          p_workplace_id: string
        }
        Returns: {
          balance_due: number | null
          cgst_amount: number | null
          confirmed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          currency: string
          date: string
          delivered_at: string | null
          discount_amount: number | null
          discount_id: string | null
          discount_label: string | null
          discount_percentage: number | null
          due_date: string | null
          email_sent_at: string | null
          email_sent_to: string | null
          email_status: string | null
          eway_bill_date: string | null
          eway_bill_no: string | null
          eway_no: string | null
          exchange_rate: number
          export_country_code: string | null
          font_family: string | null
          gst_supply_classification_source: string
          gst_supply_type: string
          id: string
          igst_amount: number | null
          irn: string | null
          irn_date: string | null
          irn_generated: boolean | null
          is_interstate: boolean | null
          is_public: boolean | null
          last_payment_date: string | null
          location_id: string | null
          logo_url: string | null
          loyalty_redemption_amount: number
          loyalty_tier_id: string | null
          lut_bond_number: string | null
          metadata: Json | null
          notes: string | null
          number: string
          order_status: string | null
          original_invoice_id: string | null
          paid_amount: number
          pdf_generated_at: string | null
          pdf_url: string | null
          place_of_supply: string | null
          port_code: string | null
          pos_session_id: string | null
          pos_terminal_id: string | null
          pos_transaction_id: string | null
          previous_balance: number | null
          primary_color: string | null
          ready_at: string | null
          reverse_charge: boolean | null
          sez_gstin: string | null
          sgst_amount: number | null
          shipping_bill_date: string | null
          shipping_bill_number: string | null
          shipping_charges: number | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax_total: number
          tcs_amount: number | null
          tcs_applicable: boolean | null
          tcs_nature: string | null
          tcs_rate: number | null
          tcs_section: string | null
          terms: string | null
          tier_discount_amount: number | null
          total: number
          type: Database["public"]["Enums"]["invoice_type"]
          updated_at: string | null
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "invoices"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_invoice_draft_core: {
        Args: {
          p_invoice: Json
          p_invoice_id?: string
          p_line_items: Json
          p_workplace_id: string
        }
        Returns: {
          balance_due: number | null
          cgst_amount: number | null
          confirmed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          currency: string
          date: string
          delivered_at: string | null
          discount_amount: number | null
          discount_id: string | null
          discount_label: string | null
          discount_percentage: number | null
          due_date: string | null
          email_sent_at: string | null
          email_sent_to: string | null
          email_status: string | null
          eway_bill_date: string | null
          eway_bill_no: string | null
          eway_no: string | null
          exchange_rate: number
          export_country_code: string | null
          font_family: string | null
          gst_supply_classification_source: string
          gst_supply_type: string
          id: string
          igst_amount: number | null
          irn: string | null
          irn_date: string | null
          irn_generated: boolean | null
          is_interstate: boolean | null
          is_public: boolean | null
          last_payment_date: string | null
          location_id: string | null
          logo_url: string | null
          loyalty_redemption_amount: number
          loyalty_tier_id: string | null
          lut_bond_number: string | null
          metadata: Json | null
          notes: string | null
          number: string
          order_status: string | null
          original_invoice_id: string | null
          paid_amount: number
          pdf_generated_at: string | null
          pdf_url: string | null
          place_of_supply: string | null
          port_code: string | null
          pos_session_id: string | null
          pos_terminal_id: string | null
          pos_transaction_id: string | null
          previous_balance: number | null
          primary_color: string | null
          ready_at: string | null
          reverse_charge: boolean | null
          sez_gstin: string | null
          sgst_amount: number | null
          shipping_bill_date: string | null
          shipping_bill_number: string | null
          shipping_charges: number | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax_total: number
          tcs_amount: number | null
          tcs_applicable: boolean | null
          tcs_nature: string | null
          tcs_rate: number | null
          tcs_section: string | null
          terms: string | null
          tier_discount_amount: number | null
          total: number
          type: Database["public"]["Enums"]["invoice_type"]
          updated_at: string | null
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "invoices"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_pos_return_draft: {
        Args: {
          p_items: Json
          p_original_transaction_id: string
          p_reason_category: string
          p_reason_text: string
          p_request_id: string
          p_return_type: string
          p_workplace_id: string
        }
        Returns: {
          attachments: Json | null
          created_at: string | null
          credit_note_generated: boolean | null
          credit_note_id: string | null
          customer_id: string | null
          draft_request_id: string | null
          exchange_amount: number | null
          exchange_invoice_id: string | null
          finalization_request_id: string | null
          finalized_at: string | null
          id: string
          metadata: Json | null
          net_refund_amount: number | null
          original_invoice_id: string | null
          original_invoice_number: string | null
          original_transaction_id: string | null
          processed_by: string
          refund_completed_at: string | null
          refund_method: string | null
          refund_status: string | null
          refunded_by: string | null
          return_date: string | null
          return_number: string
          return_reason_category: string | null
          return_reason_text: string | null
          return_type: string | null
          review_notes: string | null
          review_status: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          session_id: string | null
          status: string | null
          store_credit_amount: number | null
          store_credit_issued_id: string | null
          terminal_id: string | null
          total_return_amount: number | null
          updated_at: string | null
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "pos_returns"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_vendor_return_draft: {
        Args: {
          p_grn_id: string
          p_items: Json
          p_notes?: string
          p_reason?: string
          p_request_id: string
          p_return_date?: string
          p_workplace_id: string
        }
        Returns: {
          created_at: string
          created_by: string | null
          debit_note_id: string | null
          grn_id: string
          id: string
          notes: string | null
          reason: string | null
          return_date: string
          return_number: string
          status: string
          status_updated_at: string | null
          status_updated_by: string | null
          subtotal: number
          tax_total: number
          total: number
          updated_at: string
          vendor_bill_id: string | null
          vendor_id: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "vendor_returns"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_workplace_ai_provider: {
        Args: {
          p_api_key: string
          p_base_url: string
          p_label?: string
          p_model: string
          p_workplace_id: string
        }
        Returns: undefined
      }
      search_amplify_records: {
        Args: {
          p_limit?: number
          p_modules?: string[]
          p_query: string
          p_workplace_id: string
        }
        Returns: Json
      }
      set_accounting_activation: {
        Args: {
          p_capture_from?: string
          p_cutover_at?: string
          p_metadata?: Json
          p_mode: string
          p_reason?: string
          p_report_source?: string
          p_workplace_id: string
        }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          capture_from: string | null
          created_at: string
          cutover_at: string | null
          metadata: Json
          mode: string
          report_source: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "accounting_activation_settings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_accounting_activation_evidence: {
        Args: {
          p_chart_of_accounts_approved: boolean
          p_evidence: Json
          p_historical_backfill_complete: boolean
          p_opening_balances_approved: boolean
          p_policy_signoff_complete: boolean
          p_reconciliation_complete: boolean
          p_report_contracts_verified: boolean
          p_source_coverage_complete: boolean
          p_workplace_id: string
        }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          chart_of_accounts_approved: boolean
          created_at: string
          evidence: Json
          historical_backfill_complete: boolean
          opening_balances_approved: boolean
          policy_signoff_complete: boolean
          reconciliation_complete: boolean
          report_contracts_verified: boolean
          source_coverage_complete: boolean
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "accounting_activation_evidence"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_accounting_source_account_mapping: {
        Args: {
          p_account_id: string
          p_notes?: string
          p_source_key: string
          p_source_table: string
          p_workplace_id: string
        }
        Returns: {
          account_id: string
          approved_at: string
          approved_by: string | null
          created_at: string
          notes: string | null
          source_key: string
          source_table: string
          updated_at: string
          workplace_id: string
        }
        SetofOptions: {
          from: "*"
          to: "accounting_source_account_mappings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_amplify_builder_rules: {
        Args: { p_rules: string; p_workplace_id: string }
        Returns: undefined
      }
      set_consultant_compliance_sharing: {
        Args: { p_link_id: string; p_share: boolean }
        Returns: undefined
      }
      set_workplace_default_assignee: {
        Args: { p_profile_id: string; p_workplace_id: string }
        Returns: boolean
      }
      settle_whatsapp_send: {
        Args: {
          p_error?: string
          p_message_id: number
          p_ok: boolean
          p_provider_message_id?: string
        }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      slug_has_active_member_share: {
        Args: { p_slug: string }
        Returns: boolean
      }
      slugify_compliance_path_part: {
        Args: { p_value: string }
        Returns: string
      }
      start_agent_task: {
        Args: {
          p_lease_seconds?: number
          p_runtime_id?: string
          p_task_id: string
        }
        Returns: {
          agent_group_id: string | null
          agent_id: string
          amplify_project_id: string | null
          attempt: number
          autopilot_run_id: string | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          depends_on: string[] | null
          description: string | null
          dispatched_at: string | null
          error: string | null
          failure_reason: string | null
          id: string
          max_attempts: number
          parent_task_id: string | null
          priority: number
          recovered_at: string | null
          recovery_count: number
          result: Json | null
          runtime_heartbeat_at: string | null
          runtime_id: string | null
          runtime_lease_expires_at: string | null
          source_id: string | null
          source_type: string | null
          stage_key: string | null
          started_at: string | null
          status: string
          system_key: string | null
          ticket_id: string | null
          title: string
          trigger_summary: string | null
          workplace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_tasks"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      start_consultant_thread: {
        Args: {
          p_body: string
          p_context_key?: string
          p_context_type?: string
          p_link_id: string
          p_subject: string
        }
        Returns: string
      }
      start_workplace_trial: { Args: { p_workplace_id: string }; Returns: Json }
      start_workplace_trial_mandate: {
        Args: {
          p_razorpay_sub_id: string
          p_seats?: number
          p_workplace_id: string
        }
        Returns: Json
      }
      storage_object_workplace: {
        Args: { p_bucket: string; p_name: string }
        Returns: string
      }
      sync_bank_ledger_entry: {
        Args: { p_source_id: string; p_source_type: string }
        Returns: undefined
      }
      sync_workplace_compliance_instances_for_rules: {
        Args: {
          p_months_ahead?: number
          p_rule_ids: string[]
          p_workplace_id: string
        }
        Returns: number
      }
      take_whatsapp_send_job: { Args: { p_message_id: number }; Returns: Json }
      ticket_required_modules: {
        Args: { p_ticket_id: string }
        Returns: string[]
      }
      transfer_stock_between_locations: {
        Args: {
          p_from_location_id: string
          p_notes?: string
          p_product_id: string
          p_quantity: number
          p_request_id: string
          p_to_location_id: string
          p_workplace_id: string
        }
        Returns: Json
      }
      unreconcile_bank_statement_line: {
        Args: { p_statement_line_id: string }
        Returns: {
          amount: number
          bank_account_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          matched_to: string | null
          matched_type: string | null
          reference: string | null
          running_balance: number | null
          statement_id: string
          updated_at: string | null
          workplace_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "bank_statement_lines"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      update_po_item_received_quantity: {
        Args: { p_po_item_id: string; p_quantity: number }
        Returns: undefined
      }
      update_post_metrics: {
        Args: {
          p_comments_count?: number
          p_impressions_count?: number
          p_likes_count?: number
          p_post_id: string
          p_reach_count?: number
          p_shares_count?: number
        }
        Returns: undefined
      }
      update_social_metrics: {
        Args: {
          p_account_id: string
          p_engagement_rate?: number
          p_followers_count?: number
          p_following_count?: number
          p_posts_count?: number
        }
        Returns: undefined
      }
      upsert_accounting_account: {
        Args: {
          p_account_subtype?: string
          p_account_type: string
          p_code: string
          p_is_active?: boolean
          p_metadata?: Json
          p_name: string
          p_normal_balance: string
          p_system_key?: string
          p_workplace_id: string
        }
        Returns: string
      }
      upsert_consultant_whatsapp_template: {
        Args: {
          p_approved?: boolean
          p_body_preview?: string
          p_connection_id: string
          p_language_code?: string
          p_purpose: string
          p_template_name: string
        }
        Returns: string
      }
      validate_gstin: { Args: { gstin: string }; Returns: boolean }
      validate_hsn_code: {
        Args: { p_code: string }
        Returns: {
          code: string
          description: string
          is_valid: boolean
          suggested_rate: number
          type: string
        }[]
      }
      validate_pan: { Args: { pan: string }; Returns: boolean }
      validate_pos_payment_allocations: {
        Args: { p_payments: Json }
        Returns: number
      }
      verify_user_password: { Args: { password: string }; Returns: boolean }
      waive_compliance_dependency: {
        Args: { p_instance_id: string }
        Returns: Json
      }
      whatsapp_normalise_phone: { Args: { p_phone: string }; Returns: string }
      whatsapp_status_rank: { Args: { p_status: string }; Returns: number }
      whatsapp_window_state: {
        Args: { p_last_inbound_at: string }
        Returns: Json
      }
      workplace_consultants_overview: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      workplace_has_feature: {
        Args: { p_key: string; p_workplace_id: string }
        Returns: boolean
      }
      workplace_seat_availability: {
        Args: { p_workplace_id: string }
        Returns: Json
      }
      workplaces_i_solely_administer: {
        Args: never
        Returns: {
          other_member_count: number
          workplace_id: string
          workplace_name: string
        }[]
      }
    }
    Enums: {
      address_type: "billing" | "shipping" | "both"
      contact_type: "client" | "vendor" | "lead"
      contract_analysis_type: "risk" | "compliance" | "terms" | "indian_law"
      contract_status: "draft" | "pending_signature" | "completed"
      contract_type:
        | "service_agreement"
        | "employment"
        | "non_disclosure"
        | "lease"
        | "license"
        | "purchase"
        | "partnership"
        | "loan"
        | "other"
      department:
        | "legal"
        | "finance"
        | "operations"
        | "human_resources"
        | "technology"
        | "marketing"
        | "sales"
        | "other"
      document_type: "FOLDER" | "FILE"
      employee_range: "1-10" | "11-50" | "51-200" | "201-500" | "500+"
      gst_return_status: "pending" | "filed" | "overdue"
      gst_return_type: "GSTR1" | "GSTR3B"
      inventory_transaction_type: "purchase" | "sale" | "adjustment" | "return"
      invoice_status:
        | "draft"
        | "sent"
        | "paid"
        | "overdue"
        | "cancelled"
        | "partial"
      invoice_type:
        | "invoice"
        | "quote"
        | "credit_note"
        | "debit_note"
        | "challan"
        | "order"
      member_role: "team_head" | "team_member"
      member_status: "pending" | "approved"
      payment_method:
        | "cash"
        | "bank_transfer"
        | "upi"
        | "credit_card"
        | "debit_card"
        | "cheque"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      recurrence_frequency:
        | "daily"
        | "weekly"
        | "monthly"
        | "quarterly"
        | "annually"
      support_ticket_priority: "LOW" | "MEDIUM" | "HIGH"
      support_ticket_status: "TODO" | "IN_PROGRESS" | "RESOLVED" | "DEPRECATED"
      task_priority: "LOW" | "MEDIUM" | "HIGH"
      task_status:
        | "TODO"
        | "NOTED_FOR_COMPLIANCE"
        | "PARTIALLY_COMPLIANT"
        | "COMPLIANT"
        | "DEPRECATED"
      turnover_bracket:
        | "Pre-revenue"
        | "< ₹20L"
        | "₹20L - ₹40L"
        | "₹40L - ₹5Cr"
        | "₹5Cr - ₹100Cr"
        | "> ₹100Cr"
      user_role:
        | "super_admin"
        | "admin"
        | "professional"
        | "team_head"
        | "team_member"
      visibility_type: "WORKPLACE" | "DEPARTMENT" | "MEMBER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      address_type: ["billing", "shipping", "both"],
      contact_type: ["client", "vendor", "lead"],
      contract_analysis_type: ["risk", "compliance", "terms", "indian_law"],
      contract_status: ["draft", "pending_signature", "completed"],
      contract_type: [
        "service_agreement",
        "employment",
        "non_disclosure",
        "lease",
        "license",
        "purchase",
        "partnership",
        "loan",
        "other",
      ],
      department: [
        "legal",
        "finance",
        "operations",
        "human_resources",
        "technology",
        "marketing",
        "sales",
        "other",
      ],
      document_type: ["FOLDER", "FILE"],
      employee_range: ["1-10", "11-50", "51-200", "201-500", "500+"],
      gst_return_status: ["pending", "filed", "overdue"],
      gst_return_type: ["GSTR1", "GSTR3B"],
      inventory_transaction_type: ["purchase", "sale", "adjustment", "return"],
      invoice_status: [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
        "partial",
      ],
      invoice_type: [
        "invoice",
        "quote",
        "credit_note",
        "debit_note",
        "challan",
        "order",
      ],
      member_role: ["team_head", "team_member"],
      member_status: ["pending", "approved"],
      payment_method: [
        "cash",
        "bank_transfer",
        "upi",
        "credit_card",
        "debit_card",
        "cheque",
      ],
      payment_status: ["pending", "completed", "failed", "refunded"],
      recurrence_frequency: [
        "daily",
        "weekly",
        "monthly",
        "quarterly",
        "annually",
      ],
      support_ticket_priority: ["LOW", "MEDIUM", "HIGH"],
      support_ticket_status: ["TODO", "IN_PROGRESS", "RESOLVED", "DEPRECATED"],
      task_priority: ["LOW", "MEDIUM", "HIGH"],
      task_status: [
        "TODO",
        "NOTED_FOR_COMPLIANCE",
        "PARTIALLY_COMPLIANT",
        "COMPLIANT",
        "DEPRECATED",
      ],
      turnover_bracket: [
        "Pre-revenue",
        "< ₹20L",
        "₹20L - ₹40L",
        "₹40L - ₹5Cr",
        "₹5Cr - ₹100Cr",
        "> ₹100Cr",
      ],
      user_role: [
        "super_admin",
        "admin",
        "professional",
        "team_head",
        "team_member",
      ],
      visibility_type: ["WORKPLACE", "DEPARTMENT", "MEMBER"],
    },
  },
} as const
